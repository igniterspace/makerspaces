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
const model      = require('./model');
const router     = express.Router();
const auth       = require('../../server_lib/auth');
const user       = require('../users/api');



const errNotFound = {
  code: 404,
  message: 'Not found'
};

function getModel () {
  return require('./model');
}


// Automatically parse request body as JSON
router.use(bodyParser.json());



/**
 * Errors on "/api/<module>/*" routes.
 */
router.use(function (err, req, res, next) {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = {
    message: err.message,
    internalCode: err.code
  };
  next(err);
});



//get users from the database to show in the list in the frontend..
router.get('/getallusers', (req, res, next) => {
  model.listAllUsers((err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});



// function to add user to the database
router.post('/addusers', (req, res, next) => {
  var user = req.body;
  console.log("user =",user);
  model.addUsers(user, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});


//Edit user details in the database
router.post('/editusers', (req, res, next) => {
  var eduser = req.body;
  console.log('edited details:', eduser);
  model.getEditUser(eduser, (err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
  });
});

module.exports = router;
                                                                                                                                                                                                                                                 

// ------------------------