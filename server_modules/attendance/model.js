// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();


function getAllCoursesYears(cb) {
  connection.query(
      'SELECT DISTINCT courses.year AS courses_year FROM courses',
      (err, results) => {
          if (err) {
              cb(err);
              return;
          }
          cb(null, results);
      });
}

//function GenarateQuery(details) {
// `SELECT * FROM courses WHERE ( courses.name = '%${details.level}%' OR  courses.name = '%${details.level}%' IS NULL ) AND ( courses.year = '%${details.year}%' OR courses.year = '%${details.year}%' IS NULL ) AND ( courses.day = '%${details.day}%' OR courses.day = '%${details.day}%' IS NULL )`
// this.details = details;
//};


// GenarateQuery.prototype.filterSearch = function() {
//   console.log('this : ', this.details);
//   return `SELECT * FROM courses`
// };

//Query to Search course details..
function getCourseDetails (details, cb) {
  //console.log('detail: ', '%' + detail +'%'); 
  console.log(details);
 // var sql_1 = '';
    if (details.level != null ){

      connection.query( 'SELECT * FROM courses WHERE  courses.name =? ',[details.level], function (err, res){
        if (err) {
        throw err;
        console.log('Result : ', res);
        return;
        }
        cb(null ,res);
     });
    }
    else {
    return ("No search results");
    }
}


//get course details from database
function getCourseStudents(course_ID, cb) {
  console.log(course_ID);
  connection.query(
    'SELECT students.id AS student_id, students.first_name, students.last_name FROM students_in_course LEFT OUTER JOIN students ON ( students_in_course.s_id = students.id) WHERE c_id =? ',[ course_ID ],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
}


//get lesson details from database
function getCourseLessons(course_ID, cb) {
  console.log(course_ID);
  connection.query(
    'SELECT lessons.id, lessons.name, lessons.date FROM lessons_in_course LEFT OUTER JOIN lessons ON ( lessons_in_course.l_id = lessons.id) WHERE c_id =? ',[ course_ID ],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
}


//get student attendance details from database ( lesson attendance)
function getStudentAttendance(attDetails, cb) {
  console.log(attDetails);
  connection.query(
    'SELECT * FROM attendance WHERE ( course_id =? AND student_id=? )',[ attDetails.id , attDetails.student_id ],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
}


//get student attendance details from database ( lesson attendance)
function getStudentLessons(lesson_Details, cb) {
  connection.query(
    'SELECT * FROM lessons LEFT OUTER JOIN lessons_in_course  ON ( lessons.id = lessons_in_course.l_id ) WHERE c_id =? ',[ lesson_Details.id ],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
}


//get course students belongs to peticular lesson from database
function getLessonsAttendance(passfull_lesson_detail, cb) {
  connection.query(
    'SELECT students.id, students.first_name, students.last_name, attendance.attendance_id, attendance.attendance_mark, attendance.att_date FROM students LEFT OUTER JOIN attendance ON ( students.id = attendance.student_id) WHERE course_id=? AND lesson_id=? ',[ passfull_lesson_detail.course_ID , passfull_lesson_detail.lesson_ID ],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
      console.log("Results = ",results);
    }
  );
}


//get lessons and course details for lesson attendance page( to show details top of the page)
function getCourseLessonDetails(full_detail, cb) {
  connection.query(
    'SELECT courses.name AS level, courses.year, lessons.name, lessons.date FROM courses LEFT OUTER JOIN lessons_in_course ON ( courses.id = lessons_in_course.c_id) LEFT OUTER JOIN lessons ON ( lessons_in_course.l_id = lessons.id ) WHERE courses.id=? AND lessons.id=? ',[ full_detail.course_ID , full_detail.lesson_ID ],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
      console.log("Results = ",results);
    }
  );
}


//Mark student attendance as present
function markStudentAttendance(att_detail, cb) {
  var date = new Date();
  connection.query(
    'INSERT INTO attendance (course_id, student_id, lesson_id, attendance_mark, att_date ) VALUES (' +att_detail.course_ID + ', ' +att_detail.student_id+' , ' +att_detail.lesson_ID+',  ' + 1 +',  "' +date+'"  )',
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
      console.log("Results = ",results);
    }
  );
}


//seach students similar to entered keyword
function searchCourseStudents(searchString, cb) {
  connection.query(
    `SELECT students.first_name AS first_name, students.last_name AS last_name, courses.name AS level, courses.batch AS batch, courses.year AS year , courses.id AS course_id, students.id AS student_id FROM students LEFT OUTER JOIN students_in_course ON ( students.id = students_in_course.s_id ) LEFT OUTER JOIN courses ON ( students_in_course.c_id = courses.id ) WHERE students.first_name LIKE '%${searchString}%' OR students.last_name LIKE '%${searchString}%' OR concat(students.first_name," ",students.last_name) LIKE '%${searchString}%'`,
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
      console.log("Results = ",results);
    }
  );
}


//get student lesson attendance details
function getLessonAttendanceDetails(student_course, cb) {
  connection.query(
    ' SELECT students.id AS student_id, students.first_name, students.last_name, students.first_name, '+
    ' students.last_name, lessons.id AS lesson_id, lessons.name AS lesson_name, lessons.date AS date, attendance.attendance_mark, attendance.attendance_id'+
    ' FROM students LEFT OUTER JOIN attendance ON ( students.id = attendance.student_id )'+
    ' LEFT OUTER JOIN lessons ON ( attendance.lesson_id = lessons.id )'+
    ' WHERE attendance.course_id = ? AND students.id = ?',[student_course.course_id, student_course.student_id],
    (err, results) => {
      if (err) {
        cb(err); 
        return;
      }
      cb(null, results);
      console.log("Results = ",results);
    }
  );
}

// create attendace table and related tables in the database
function createSchema(config, cb) 
{
    const connection = database.createMultipleStatementConnection(config);
    connection.query(

      `CREATE TABLE IF NOT EXISTS \`attendance\` (
        \`attendance_id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`course_id\` INT UNSIGNED NOT NULL,
        \`student_id\` INT UNSIGNED NOT NULL,
        \`lesson_id\` INT UNSIGNED NOT NULL,
        \`attendance_mark\` INT ,        
        \`att_date\` VARCHAR(255),
      PRIMARY KEY (\`attendance_id\`))  ENGINE=INNODB;` +

      `ALTER TABLE \`attendance\` 
      ADD FOREIGN KEY (\`course_id\`)   
      REFERENCES \`courses\`(\`id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;` +

      `ALTER TABLE \`attendance\` 
      ADD FOREIGN KEY (\`student_id\`)   
      REFERENCES \`students\`(\`id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;` +

      `ALTER TABLE \`attendance\` 
      ADD FOREIGN KEY (\`lesson_id\`)   
      REFERENCES \`lessons\`(\`id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;`
    ,


        (err) => {
            if (err) {
              throw err;
            }
            console.log("Successfully created attendance table");
            connection.end();
            cb(null);
          }
    );
}

module.exports = {

    createSchema          : createSchema,
    getAllCoursesYears    : getAllCoursesYears,
    getCourseDetails      : getCourseDetails,
    getCourseStudents     : getCourseStudents,
    getCourseLessons      : getCourseLessons,
    getStudentAttendance  : getStudentAttendance,
    getStudentLessons     : getStudentLessons,
    getLessonsAttendance  : getLessonsAttendance,
    getCourseLessonDetails: getCourseLessonDetails,
    markStudentAttendance : markStudentAttendance,
    searchCourseStudents  : searchCourseStudents,
    getLessonAttendanceDetails : getLessonAttendanceDetails
  };
  

