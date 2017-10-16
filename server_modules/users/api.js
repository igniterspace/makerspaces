// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const oauth2 = require('../../server_lib/oauth2');
const logging = require('../../server_lib/logging');
const makerspaceLogic = require('../locations/logic');

const errNotFound = {
  code: 404,
  message: 'Not found'
};

function getModel () {
  return require(`./model`);
}

const router = express.Router();

// Use the oauth middleware to automatically get the user's profile
// information and expose login/logout URLs to templates.
router.use(oauth2.template);

// Automatically parse request body as JSON
router.use(bodyParser.json());


/**
 * GET /api/users/me
 * 
 */
router.get('/me/access/location/:locationId', oauth2.required, (req, res, next) => {
  let user = req.user;
  let locationId = req.params.locationId;
  
  //get the locations user has access to
  makerspaceLogic.getLocationAccess(user, locationId, (err, access) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      items: access
    });
  })
});

/**
 * GET /api/users/me
 * 
 */
router.get('/me', oauth2.required, (req, res, next) => {
  let user = req.user;
  
  //get the locations user has access to
  makerspaceLogic.getLocations(user, (err, organizations) => {
    if (err) {
      next(err);
      return;
    }
    user.organizations = organizations;
    res.json({
      items: user
    });
  })
});

/**
 * GET /api/users?organization=2
 * GET /api/users?email=hasith@igniterspace.com
 * 
 */
router.get('/', oauth2.required, getByEmail, getAllByOrganization);
//router.get('/:id', read);

function getAllByOrganization(req, res, next) {
  let organizationId = parseInt(req.query['organization']);
  //if user is not a part of the organization return error
  if (!oauth2.isInOrganization(req.user, organizationId)) {
    next(errNotFound);
    return;
  }
  // if organization id is defined, continue
  if (organizationId) { 
    getModel().listAllByOrganization(organizationId, (err, entities) => {
      if (err) {
        next(err);
        return;
      }
      res.json({
        items: entities
      });
    });
  } else {  // proceed to the next matching routing function
    next();
  };
};

function getByEmail(req, res, next) {
  let email = req.query['email'];
  if(email){
    getModel().readByEmail(email, (err, entities) => {
      if (err) {
        next(err);
        return;
      }
      res.json({
        items: entities
      });
    });
  } else {  // proceed to the next matching routing function
    next();
  };
}

/**
 * Errors on "/api/<module>/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = {
    message: err.message,
    internalCode: err.code
  };
  next(err);
});

module.exports = router;
