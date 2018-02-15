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
  console.log("value_students:",c_id);  
  model.getAllCourseStudents(c_id,(err, results) => {
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

//Get lesson list to show on the list (frontend)..
router.get('/getallcourselessons/:courses_id', (req, res, next) => {
   var c_id = req.params.courses_id;
   console.log("value_lessons:",c_id);
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
  console.log(course);
  model.addCourse(course, (err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});


//Insert a lesson to the database..
router.post('/addlesson', (req, res, next) => {
  var lesson = req.body;
  console.log(lesson);
  model.addLesson(lesson, (lesson, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Edit Course information..
router.post('/updateCourse', (req, res, next) => {
  var edcourse = req.body;
  console.log('updated details:', edcourse);
  model.getEditCourse(edcourse, (err, results) => {
    if (err) {
      throw err;
      console.log(err)
    }
    res.json({
      item: results
    });
  });
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

module.exports = router;
