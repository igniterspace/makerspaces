// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logging = require('../../server_lib/logging');

const errNotFound = {
  code: 404,
  message: 'Not found'
};

function getModel () {
  return require(`./model`);
}

const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());



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
