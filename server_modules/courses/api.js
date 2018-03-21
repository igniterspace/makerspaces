
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

//Get courses details to show on the list (frontend)..
router.get('/getallcourses', (req, res, next) => {
  model.listAllCourses((err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});


//Get list of all students of the course to the frontend..
router.get('/getallcoursestudents/:courses_id', (req, res, next) => {
  var c_id = req.params.courses_id;
  model.getAllCourseStudents(c_id,(err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

router.get('/getcourseid/:courses_id', (req, res, next) => {
  var c_id = req.params.courses_id;
  model.getCourseDetails(c_id,(err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});


//get all students to show on the dropdown..
router.get('/listallstudents', (req, res, next) => {
  model.listAllStudents((err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//get all lessons to show on the dropdown..
router.get('/listalllessons', (req, res, next) => {
  model.listAllLessons((err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Get lesson list to show on the list (frontend)..
router.get('/getallcourselessons/:courses_id', (req, res, next) => {
   var c_id = req.params.courses_id;
   model.getAllCourseLessons(c_id,(err, results) => {
     if (err) {
       throw err;
     }
     res.json({
       item: results
     });
   });  
 });


//Send Course details to the database..
router.post('/addcourse', (req, res, next) => {
  var course = req.body;
  model.addCourse(course, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results,
      
    });
  });
  res.send({})
})

//Add a new lesson to the database..
router.post('/addlesson', (req, res, next) => {
  var lesson = req.body;
  model.addLesson(lesson, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
  res.send({})
});

//Insert a lesson to a course (lessons_in_course table)..
router.post('/addcourselesson', (req, res, next) => {
  var courselesson = req.body;
  model.addCourseLesson(courselesson, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
  res.send({})
});

//Insert a student to the course..
router.post('/addstudent', (req, res, next) => {
  var student = req.body;
  model.addStudent(student, (student, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
  res.send({})
});

//Edit Course information..
router.post('/updateCourse', (req, res, next) => {
  var edcourse = req.body;
  model.getEditCourse(edcourse, (err, results) => {
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

//Edit Course's Lesson date..
router.post('/updateCourseLesson', (req, res, next) => {
  var edlesson = req.body;
  model.EditLessonDate(edlesson, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
  res.send({})
});

//Delete course from the list and from the database..
router.get('/deleteCourse/:coursetid', (req, res, next) => {
  var course_id = req.params.coursetid;
  model.deleteCourse(course_id, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Delete lesson from the course and from the database..
router.post('/deleteLesson', (req, res, next) => {
  var lesson_id = req.body;
  model.deleteLesson(lesson_id, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Delete student from the course and from the database..
router.post('/deleteStudent', (req, res, next) => {
  var student_id = req.body;
  model.deleteStudent(student_id, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Search students..
router.get('/search/:search', (req, res, next) => {
  var detail = req.params.search;
  model.searchStudent(detail, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Search lessons..
router.get('/searchles/:search', (req, res, next) => {
  var lesdetail = req.params.search;
  model.searchLessons(lesdetail, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Get lesson to the frontend to check the validity..
router.get('/checkIfLessonExists', (req, res, next) => {
  //console.log('isLesson',req.query.isLesson, 'value :', req.query.value);
 // console.log('REQ : ', req.query);
  model.getLesson(req.query.value, (err, results) => {
    if (err) {
      throw err;
     
    }
    //console.log('Result 1 : ', results);
    res.json({
      item :results
    });
   
  });
});

module.exports = router;
