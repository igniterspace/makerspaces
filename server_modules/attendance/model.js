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
      console.log("Resultsr = ",results);
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
      console.log("Resultsr = ",results);
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
      console.log("Resultsr = ",results);
    }
  );
}


//get student attendance details from database ( lesson attendance)
function getStudentLessons(lesson_Details, cb) {
  console.log("haha ha =", lesson_Details);
  connection.query(
    'SELECT * FROM lessons LEFT OUTER JOIN lessons_in_course  ON ( lessons.id = lessons_in_course.l_id ) WHERE c_id =? ',[ lesson_Details.id ],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
      console.log("Resultsr = ",results);
    }
  );
}


//get course lessons from database
function getLessons(course_ID, cb) {
  console.log(course_ID);
  connection.query(
    'SELECT lessons.id, lessons.name, lessons.date FROM lessons_in_course LEFT OUTER JOIN lessons ON ( lessons_in_course.l_id = lessons.id) WHERE c_id =? ',[ course_ID ],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
      console.log("Resultsr = ",results);
    }
  );
}

function createSchema(config, cb) 
{
    const connection = database.createMultipleStatementConnection(config);
    connection.query(

      `CREATE TABLE IF NOT EXISTS \`attendance\` (
        \`attendance_id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`course_id\` INT UNSIGNED NOT NULL,
        \`student_id\` INT UNSIGNED NOT NULL,
        \`lesson_id\` INT UNSIGNED NOT NULL,
        \`attendance\` INT DEFAULT 0,        
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

    createSchema        : createSchema,
    getAllCoursesYears  : getAllCoursesYears,
    getCourseDetails    : getCourseDetails,
    getCourseStudents   : getCourseStudents,
    getCourseLessons    : getCourseLessons,
    getStudentAttendance: getStudentAttendance,
    getStudentLessons   : getStudentLessons
  };
  