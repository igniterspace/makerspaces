
// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const logging    = require('../../server_lib/logging');
const model      = require('./model');
const router     = express.Router();

const errNotFound = {
  code: 404,
  message: 'Not found'
};

function getModel () {
  return require('./model');
}


// Automatically parse request body as JSON
router.use(bodyParser.json());

//Search students..
router.get('/search/:search', (req, res, next) => {
    var studentdetail = req.params.search;
    model.searchStudentspayments(studentdetail, (err, results) => {
      if (err) {
        throw err;
      }
      res.json({
        item: results
      });
    });
  });

//Insert a payment to the course..
router.post('/addPayment', (req, res, next) => {
  var payment = req.body;
  console.log("api call:",payment);
  model.addPayment(payment, (payment, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
  res.send({})
});

//Get payment list to show on the list (frontend)..
router.post('/getallpayments', (req, res, next) => {
  var details = req.body;
  model.getAllPayments(details,(err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });  
});

//Get total payment amout to show on the list (frontend)..
router.post('/gettotalpayments', (req, res, next) => {
  var details = req.body;
  model.getSumPayments(details,(err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });  
});

module.exports = router;