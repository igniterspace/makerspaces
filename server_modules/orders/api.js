// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const logging     = require('../../server_lib/logging');
const model       = require('./model');

const errNotFound = {
  code: 404,
  message: 'Not found'
};

function getModel() {
  return require(`./model`);
}

const router      = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());


//Get all orders history
router.get('/orderhistory', (req, res, next) => {
  model.getOrderHistory((err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
    console.log(res);
  });
});



//Get Order Item history
router.get('/orderitemhistory/:orderID', (req, res, next) => {
  var orderId = req.params.orderID;
  console.log(orderId);
  model.getOrderItemHistory(orderId, (err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
    console.log(res);
  });
});

//get product names of the items
router.get('/productsnames', (req, res, next) => {
  model.getProducts((err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
    console.log(res);
  });
});


// Insert orders into database
router.post('/submitorders', (req, res, next) => {
  var order = req.body;
  console.log(order);
  model.submitOrder(order, (err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
    console.log(res);
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
