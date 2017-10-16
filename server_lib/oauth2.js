// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
const config = require('../server-config');
const logging = require('./logging');
const userModel = require('../server_modules/users/model');
const request=require('request');

// [START setup]
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

let userAccessToken = null;

function extractProfile (profile) {

  let imageUrl, email, domain, familyName, givenName = '';
  
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  if (profile.emails && profile.emails.length) {
    email = profile.emails[0].value;
  }
  if (profile.name) {
    familyName = profile.name.familyName;
    givenName = profile.name.givenName;
  }
  return {
    auth_ref: profile.id,
    //domain: profile.domain,
    given_name: givenName,
    family_name: familyName,
    auth_provider: profile.provider,
    profile_image: imageUrl,
    email: email
  };
}

function findOrCreate(profile, cb) {
  userModel.readByEmail(profile.email, (err, user)=>{
    if (err && err.code == 404) {
      userModel.create(profile, cb);
    } else {
      userModel.updateByEmail(profile.email, profile, cb);
    }
  });
}

// Configure the Google strategy for use by Passport.js.
//
// OAuth 2-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's behalf,
// along with the user's profile. The function must invoke `cb` with a user
// object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new GoogleStrategy({
  clientID: config.get('OAUTH2_CLIENT_ID'),
  clientSecret: config.get('OAUTH2_CLIENT_SECRET'),
  callbackURL: config.get('OAUTH2_CALLBACK'),
  accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
  userAccessToken = accessToken;
  // Extract the minimal profile information we need from the profile object
  // provided by Google
  let providerProfile = extractProfile(profile);
  //find the profile in database or save if not existing
  findOrCreate(providerProfile, cb);
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
// [END setup]

const router = express.Router();

// [START middleware]
// Middleware that requires the user to be logged in. If the user is not logged
// in, it will redirect the user to authorize the application and then return
// them to the original URL they requested.
function authRequired (req, res, next) {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/auth/login');
  }
  next();
}

// Middleware that exposes the user's profile as well as login/logout URLs to
// any templates. These are available as `profile`, `login`, and `logout`.
function addTemplateVariables (req, res, next) {
  res.locals.profile = req.user;
  res.locals.login = `/auth/login?return=${encodeURIComponent(req.originalUrl)}`;
  res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
  next();
}
// [END middleware]

// Begins the authorization flow. The user will be redirected to Google where
// they can authorize the application to have access to their basic profile
// information. Upon approval the user is redirected to `/auth/google/callback`.
// If the `return` query parameter is specified when sending a user to this URL
// then they will be redirected to that URL when the flow is finished.
// [START authorize]
router.get(
  // Login url
  '/auth/login',

  // Save the url of the user's current page so the app can redirect back to
  // it after authorization
  (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },

  // Start OAuth 2 flow using Passport.js
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
// [END authorize]

// [START callback]
router.get(
  // OAuth 2 callback url. Use this url to configure your OAuth client in the
  // Google Developers console
  '/auth/google/callback',

  // Finish OAuth 2 flow using Passport.js
  passport.authenticate('google', {
      scope : ["profile", "email"],
      prompt : "select_account"
  }),

  // Redirect back to the original page, if any
  (req, res) => {
    const redirect = req.session.oauth2return || '/';
    delete req.session.oauth2return;
    res.redirect(redirect);
  }
);
// [END callback]

// Deletes the user's credentials and profile from the session.
// This does not revoke any active tokens.
router.get('/auth/logout', (req, res) => {
  request.get('https://accounts.google.com/o/oauth2/revoke', {
    qs:{token: userAccessToken}
  }, function (err, response, body) {
    req.session.destroy(function (err) {
      req.logout();
      res.redirect(req.query['return']);
    });
  })

 
});

/*
* check if the given user is an admin
*/
function isAdmin(user, locationId, entity, level) {
  //admin has all rights to anything
  if(user && (user.type === "admin")) return true;

  return false;
}
/*
* check if the given user has the level of access to the requested entity at the given location
*/
function hasPermission(user, locationId, entity, requestingLevel) {
  // not logged in
  if(!user) return false;

  //admin has all rights to anything
  if(user.type === "admin") return true;

  //if user has a permission for something in the organization, return true
  if(user.permissions && user.permissions.length) {
    for (var i=0; i<user.permissions.length; i++) {
      if (user.permissions[i].location_id === locationId 
        && user.permissions[i].permission_entity === entity) {
          let givenLevel = user.permissions[i].permission_level;
          if ("write" === givenLevel) {
            return true;
          } else if ("read" === givenLevel && requestingLevel === "read") {
            return true;
          }
          return false;
      }
    }
  }
}

/*
* check if the given user has any level of access to the requested organization
*/
function isInOrganization(user, organizationId) {
  // not logged in
  if(!user) return false;

  //admin belongs to any organization
  if(user.type === "admin") return true;

  //if user has a permission for something in the organization, return true
  if(user.permissions && user.permissions.length) {
    for (var i=0; i<user.permissions.length; i++) {
      if (user.permissions[i].organization_id === organizationId) {
        return true;
      }
    }
  }
  
  return false;
}

module.exports = {
  extractProfile: extractProfile,
  router: router,
  required: authRequired,
  template: addTemplateVariables,
  isInOrganization: isInOrganization,
  hasPermission: hasPermission,
  isAdmin: isAdmin
};
