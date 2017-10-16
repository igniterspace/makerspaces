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
 * GET /api/location/1/orders
 * 
 */
router.get('/', oauth2.required, (req, res, next) => {
  if (oauth2.hasPermission(req.user, req.locationId, 'orders', 'read')) {
   
    getModel().list(req.locationId, 10, req.query.pageToken, (err, entities, cursor) => {
      if (err) {
        next(err);
        return;
      }
      res.json({
        items: entities,
        nextPageToken: cursor
      });
    });

  } else {
    res.status(401).send("Not Authorized. User #" + req.user.id + " has no permission to execute this operation at location #" + req.locationId);
  }
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
