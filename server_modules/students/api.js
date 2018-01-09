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
      console.log(err)
    }
    res.json({
      item: results
    });
    console.log(res);
  });
});

//Search exisiting guardians from the database
router.get('/searchguardians', (req, res, next) => {
  model.searchGuardian((err, results) => {
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

//get students from the database to show in the list in the frontend..
router.get('/getallstudents', (req, res, next) => {
  model.listAllStudents((err, results) => {
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


//Send student details to the database..
router.post('/addStudent', (req, res, next) => {
  var student = req.body;
  model.addStudents(student, (err, results) => {

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

//Edit Student information
router.get('/updateStudent/:studentID', (req, res, next) => {
  var studentId = req.params.studentID;
  model.getEditStudent(studentId, (err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
  });
});


//Send guardian details to the database..
router.post('/addGuardian', (req, res, next) => {
  var guar = req.body;
  console.log("Submited guardian data gets to the api");
  console.log(req.body);
  console.log(guar);
  model.addGuardians(guar, (err, results) => {

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


//Assign a Guardian..
router.post('/assGuardian', (req, res, next) => {
  var assguar = req.body;
  console.log("Assigned guardian data gets to the api");
  console.log(assguar);
  model.assignGuardians(assguar, (err, results) => {

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


//Delete student from the list and from the database..
router.get('/deleteStudent/:studentid', (req, res, next) => {
  var student_id = req.params.studentid;
  console.log('delete this student: ', student_id);
  model.deleteStudent(student_id, (err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
    // console.log(res);
  });
});

module.exports = router;
