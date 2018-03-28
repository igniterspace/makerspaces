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
const auth       = require('../../server_lib/auth');
const user       = require('../users/api')

const errNotFound = {
  code: 404,
  message: 'Not found'
};

router.use(bodyParser.json());

//get guardians from the database to show in the frontend..
router.get('/getallguardians', (req, res, next) => {
  model.listAllGuardians((err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Get email address to the frontend to check the validity..
router.get('/checkIfUserExists', (req, res, next) => {
  // console.log('isEMail',req.query.isEmail, 'value :', req.query.value);
  // console.log('REQ : ', req.query);
  model.getEmail(req.query.value, (err, results) => {
    if (err) {
      throw err;
     
    }
    //console.log('Result 1 : ', results[0].email_address);
    res.json({
      item :results
    });
   
  });
});


//get students from the database to show in the list in the frontend..
router.get('/getallstudents/:currentLocationId', (req, res, next) => {
  var location_id = req.params.currentLocationId;
  model.listAllStudents(location_id,(err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});


//Send student details to the database..
router.post('/addStudent', (req, res, next) => {
  var student = req.body;
  model.addStudents(student, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
  res.send({})
});

//Edit Student information..
router.post('/updateStudent', (req, res, next) => {
  var edstudent = req.body;
  model.getEditStudent(edstudent, (err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
  });
  res.send({})
});

//Send guardian details to the database..
router.post('/addGuardian', (req, res, next) => {
  var guar = req.body;
  model.addGuardians(guar, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
  res.send({})
});


//Assign a Guardian..
router.post('/assGuardian', (req, res, next) => {
  var assguar = req.body;
  model.assignGuardians(assguar, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
  res.send({})
});


//Delete student from the list and from the database..
router.get('/deleteStudent/:studentid', (req, res, next) => {
  var student_id = req.params.studentid;
  model.deleteStudent(student_id, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Search guardians..
router.get('/search/:search', (req, res, next) => {
  var detail = req.params.search;
  model.searchGuardian(detail, (err, results) => {
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
