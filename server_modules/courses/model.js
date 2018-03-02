// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();

//Query to get courses from the database to show in the frontend (list)..
function listAllCourses(cb) {
  connection.query(
      'SELECT DISTINCT courses.id AS courses_id, courses.name AS courses_name , courses.year AS courses_year , courses.from_date AS courses_from_date , courses.to_date AS courses_to_date , courses.day AS courses_day FROM courses', 
      (err, results) => {
          if (err) {
              cb(err);
              return;
          }
          cb(null, results);
      });
}

//Query to get students from courses from the databes to show in the frontend..
// function getAllCourseStudents(coId,cb) {
//     connection.query(
//       'SELECT students_in_course.c_id AS c_id, students_in_course.s_id AS s_id, CONCAT (students.first_name," ",students.last_name) AS students_name FROM students_in_course LEFT OUTER JOIN students ON (students_in_course.s_id = students.id) WHERE c_id=?', [coId],
//       (err, results) => {
//         if (err) {
//           cb(err);
//           return;
//         }
//         cb(null, results);
//       }
//     );
//   }

function getAllCourseStudents(cb) {
  connection.query(
    'SELECT students_in_course.c_id AS c_id, students_in_course.s_id AS s_id, CONCAT (students.first_name," ",students.last_name) AS students_name FROM students_in_course LEFT OUTER JOIN students ON (students_in_course.s_id = students.id)',
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
}

//Query to get lessons from courses from the databes to show in the frontend..  
function getAllCourseLessons(cb) {
    connection.query(
        'SELECT lessons_in_course.c_id AS c_id, lessons_in_course.l_id AS l_id, lessons.name AS lesson_name FROM lessons_in_course LEFT OUTER JOIN lessons ON (lessons_in_course.l_id = lessons.id) WHERE c_id=?', 
        (err, results) => {
            if (err) {
                cb(err);
                return;
            }
            cb(null, results);
        });
  }


//Query to Send course details to the database..         
function addCourse(course, res) {
    connection.query('INSERT INTO `courses` (name, year, from_date, to_date , day  ) VALUES ("'+ course.course_name+'", "'+ course.course_year+'","'+ course.from_day+'", "'+ course.to_day+'" , "'+ course.course_day+'" )' , function (err, resp) {
            if (err) throw err;
              });
        };

//Query to Send lesson details to the database..         
function addLesson(lesson, res) {
    connection.query('INSERT INTO `lessons` (name, date) VALUES ("'+ lesson.lesson_name+'", "'+ lesson.day+'")' , function (err, resp) {
            if (err) throw err;
              });
        };

//Create the database..
function createSchema(config, cb) {
  const connection = database.createMultipleStatementConnection(config);
  connection.query(


`CREATE TABLE IF NOT EXISTS \`courses\` (
\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
\`batch\` VARCHAR(255) NULL,
\`name\` VARCHAR(255) NULL,
\`year\` VARCHAR(255) NULL,
\`from_date\` VARCHAR(255) NULL,
\`to_date\` VARCHAR(255) NULL,
\`day\` VARCHAR(20) NULL,
PRIMARY KEY (\`id\`))  ENGINE=INNODB;` +

`CREATE TABLE IF NOT EXISTS \`lessons\` ( 
\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
\`name\` VARCHAR(255) NULL,
\`date\` VARCHAR(20) NULL,
PRIMARY KEY (\`id\`))  ENGINE=INNODB;`  +

`CREATE TABLE IF NOT EXISTS \`lessons_in_course\` (
\`c_id\` INT UNSIGNED NOT NULL,
\`l_id\` INT UNSIGNED NOT NULL,
PRIMARY KEY (\`c_id\`, \`l_id\`))  ENGINE=INNODB;` +

`CREATE TABLE IF NOT EXISTS \`students_in_course\` (
\`c_id\` INT UNSIGNED NOT NULL,
\`s_id\` INT UNSIGNED NOT NULL,
PRIMARY KEY (\`c_id\`, \`s_id\`))  ENGINE=INNODB;` +

`CREATE TABLE IF NOT EXISTS \`students_in_lesson\` (
\`l_id\` INT UNSIGNED NOT NULL,
\`s_id\` INT UNSIGNED NOT NULL,
PRIMARY KEY (\`l_id\`, \`s_id\`))  ENGINE=INNODB;` +

`ALTER TABLE \`lessons_in_course\`
ADD FOREIGN KEY (\`c_id\`)
REFERENCES \`courses\`(\`id\`)
ON UPDATE CASCADE 
ON DELETE CASCADE;` +

`ALTER TABLE \`lessons_in_course\`
ADD FOREIGN KEY (\`l_id\`)
REFERENCES \`lessons\`(\`id\`)
ON UPDATE CASCADE 
ON DELETE CASCADE;` +

`ALTER TABLE \`students_in_course\`
ADD FOREIGN KEY (\`c_id\`)
REFERENCES \`courses\`(\`id\`)
ON UPDATE CASCADE 
ON DELETE CASCADE;` +

`ALTER TABLE \`students_in_course\`
ADD FOREIGN KEY (\`s_id\`)
REFERENCES \`students\`(\`id\`)
ON UPDATE CASCADE 
ON DELETE CASCADE;` +

`ALTER TABLE \`students_in_lesson\`
ADD FOREIGN KEY (\`s_id\`)
REFERENCES \`students\`(\`id\`)
ON UPDATE CASCADE 
ON DELETE CASCADE;` +

`ALTER TABLE \`students_in_lesson\`
ADD FOREIGN KEY (\`l_id\`)
REFERENCES \`lessons\`(\`id\`)
ON UPDATE CASCADE 
ON DELETE CASCADE;` ,

(err) => {
  if (err) {
      throw err;
      }
  console.log('Successfully created schemas: courses, lessons, lessons_in_course, students_in_course , students_in_lesson');
  connection.end();
  cb(null);
      }
  );
}

module.exports = {
  createSchema         : createSchema,
  listAllCourses       : listAllCourses,
  getAllCourseLessons  : getAllCourseLessons,
  getAllCourseStudents : getAllCourseStudents,
  addCourse            : addCourse,
  addLesson            : addLesson
  
};