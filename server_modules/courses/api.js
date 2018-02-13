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

//const router = express.Router();

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


//Get details of all students of the course to the frontend..
// router.get('/getallcoursestudents', (req, res, next) => {
//   //var coId = req.params.c_id;
//   model.getAllCourseStudents((err, results) => {
//    console.log(results);
//     if (err) {
//       throw err;
//       console.log(err);
//     }
//     res.json({
//       item: results
      
//     });
//   });
// });

router.get('/getallcoursestudents', (req, res, next) => {
 // var coId = req.params.c_id;
  model.getAllCourseStudents((err, results) => {
    if (err) {
      throw err;
    }
    res.json({
      item: results
    });
  });
});

//Get lesson details to show on the list (frontend)..
router.get('/getalllessons', (req, res, next) => {
  model.listAllLessons((err, results) => {
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

module.exports = router;
