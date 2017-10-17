// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../../server_lib/auth');
const logging = require('../../server_lib/logging');
const model = require('./model');

const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

router.get('/permitted', auth.jwtCheck, (req, res, next) => {
  let user = auth.currentUser(req);

  if (!user.appMetadata) {
    res.status(403).send('Access denied. User app-metadata not found. Grant user access to resources in Auth0 user management console.');
    return;
  }

  if (user.appMetadata['access']['*']) {
    // get all locations

    model.listAllLocations((err, results) => {
      if (err) {
        throw err;
      }
      res.json({
        items: structureLocations(results)
      });
    });

  } else {
    var locationIds = Object.keys(user.appMetadata['access']);
    //remove * from the ids array
    var index = locationIds.indexOf('*');
    if (index > -1) {
      array.splice(index, 1);
    }
    // get specific locations

    model.listLocationsByIds((err, results) => {
      if (err) {
        throw err;
      }
      res.json({
        items: structureLocations(results)
      });
    });
  }

});


function structureLocations(results) {
  // create a composite user object
  let organizations = {};
  //add permissions if any
  for (var i = 0; i < results.length; i++) {
    let record = results[i];
    //if org not existing create it
    if (!organizations[record.organization_id]) {
      organizations[record.organization_id] = {
        locations: {},
        name: record.organization_name,
        id: record.organization_id
      };
    }
    // add the location record
    organizations[record.organization_id].locations[record.location_id] = {
      location_id: record.location_id,
      location_name: record.location_name,
    }
  }
  return organizations;
}

router.get('/current', auth.jwtCheck, (req, res, next) => {
  let user = auth.currentUser(req);

  if (!user.appMetadata) {
    res.status(403).send('Access denied. User app-metadata not found. Grant user access to resources in Auth0 user management console.');
    return;
  }

  model.getLocation(user.currentLocation, (err, results) => {
    if (results && results.length) {
      var locationRecord = results[0];
      var locationAccess = user.appMetadata['access'][user.currentLocation + ''];
      if (!locationAccess) {
        locationAccess = user.appMetadata['access']['*'];
      }
      res.json({
        items: {
          name: locationRecord['name'],
          permissions: locationAccess
        }
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
});


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
