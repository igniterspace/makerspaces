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

const router   = express.Router();

//get all course years
router.get('/getCoursesYears', (req, res, next) => {
  model.getAllCoursesYears((err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//get all course details
router.post('/getCourses', (req, res, next) => {
  var details = req.body;
  model.getCourseDetails(details, (err, results) => {
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


//get students belongs to required course
router.get('/getCourseStudents/:course_id', (req, res, next) => {
  var course_ID = req.params.course_id;
  model.getCourseStudents(course_ID, (err, results) => {
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


//get lessons belongs to required course
router.get('/getCourseLessons/:course_id', (req, res, next) => {
  var course_ID = req.params.course_id;
  model.getCourseLessons(course_ID, (err, results) => {
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


//get student attendance record
router.post('/getStudentAttendance', (req, res, next) => {
  var attDetails = req.body;
  console.log(attDetails);
  model.getStudentAttendance(attDetails, (err, results) => {
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


//get student course lessons
router.post('/getStudentLessons', (req, res, next) => {
  var lesson_Details = req.body;
  console.log("api =", lesson_Details);
  model.getStudentLessons(lesson_Details, (err, results) => {
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


//get lessons belongs to course
router.get('/getlessons/:course_id', (req, res, next) => {
  var course_ID = req.params.courseId;
  model.getLessons(course_ID, (err, results) => {
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



// Automatically parse request body as JSON
router.use(bodyParser.json());


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
