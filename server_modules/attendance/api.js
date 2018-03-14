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


//get lessons attendance register
router.post('/getLessonAttendance', (req, res, next) => {
  var passfull_lesson_detail = req.body;
  console.log(passfull_lesson_detail);
  model.getLessonsAttendance(passfull_lesson_detail, (err, results) => {
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


//get lessons and course details for lesson attendance page( to show details top of the page)
router.post('/getCourseLessonDetails', (req, res, next) => {
  var full_detail = req.body;
  console.log( full_detail );
  model.getCourseLessonDetails(full_detail, (err, results) => {
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

//mark student as present and fill attendance table
router.post('/markStudentAttendance', (req, res, next) => {
  var att_detail = req.body;
  console.log( att_detail );
  model.markStudentAttendance(att_detail, (err, results) => {
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


//search students similar to entered keyword
router.get('/searchCourseStudents/:search', (req, res, next) => {
  var searchString = req.params.search;
  console.log( "api search =",searchString );
  model.searchCourseStudents(searchString, (err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
    console.log("results hjjhh =",res);
  });
});


// get student lesson attendance details
router.post('/getLessonAttendanceDetails', (req, res, next) => {
  var student_course = req.body;
  console.log( student_course );
  model.getLessonAttendanceDetails(student_course, (err, results) => {
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
