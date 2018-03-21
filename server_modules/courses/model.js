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
    'SELECT DISTINCT courses.id AS courses_id, CONCAT (courses.batch," ",courses.name) AS courses_name , courses.year AS courses_year , courses.from_date AS courses_from_date , courses.to_date AS courses_to_date , courses.day AS courses_day FROM courses', 
    (err, results) => {
        if (err) {
            cb(err);
            return;
        }
        cb(null, results);
    });
}


//Query to get students from courses from the databes to show in the frontend..
function getAllCourseStudents(c_id,cb) {
  connection.query(
    'SELECT students_in_course.c_id AS c_id, students_in_course.s_id AS id, students.first_name AS first_name ,students.last_name AS last_name , students.date_of_birth AS date_of_birth , students.home_address AS home_address , students.gender AS gender , students.g_id AS g_id  FROM students_in_course LEFT OUTER JOIN students ON (students_in_course.s_id = students.id) WHERE c_id=? ', [c_id],
    (err, results) => {
    if (err) {
      cb(err);
      return;
        }
      cb(null, results);
    }
  );
}

function getCourseDetails(c_id,cb) {
    connection.query(
      'SELECT courses.id AS c_id  FROM courses WHERE id=? ', [c_id],
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
function getAllCourseLessons(c_id,cb) {
    connection.query(`SELECT lessons_in_course.c_id AS c_id, lessons_in_course.l_id AS l_id, lessons_in_course.held_date AS dateh  , lessons.name AS lesson_name FROM lessons_in_course LEFT OUTER JOIN lessons ON (lessons_in_course.l_id = lessons.id) WHERE c_id= ? ORDER BY held_date ASC`,[c_id],
    
    (err, results) => {
        if (err) {
          cb(err);
          return;
        }
      cb(null, results);
    });
}
//Query to add a lesson to a course with a date..         
// function getAllCourseLessons(c_id, cb) {
//     connection.beginTransaction(function (err) {
     
//       if (err) { throw err; }
//       connection.query(`SELECT lessons_in_course.c_id AS c_id, lessons_in_course.l_id AS l_id, lessons_in_course.held_date AS dateh  , lessons.name AS lesson_name FROM lessons_in_course LEFT OUTER JOIN lessons ON (lessons_in_course.l_id = lessons.id) WHERE c_id= ?`, [c_id], function (err, result) {
//         if (err) {
//           connection.rollback(function () {
//             throw err;
//           });
//         };
//         console.log('Result : ', result);
//         var last_selected_course_id = result[0].c_id;
//         console.log("bla bla", last_selected_course_id);
//         connection.query( `UPDATE lessons_in_course SET held_date = str_to_date( held_date , '%Y-%m-%d' ) WHERE lessons_in_course.c_id = ?` , [last_selected_course_id ], function (err, result) {
//             if (err) {
//               connection.rollback(function () {
//                 throw err;
//               });
//             }   
//             //cb(null,result);
//             console.log("final result:" , result);

//             });
//         })
       
//     });
    
//        connection.commit(function(err) {
//         if (err) {
//           return connection.rollback(function() {
//             throw err;
//           });
         
//         }
//         cb(null,this.result);
//     console.log('success!');
//     }); 
// };

//Query to get student names to show on the dropdown..  
  function listAllStudents(cb) {
    connection.query(
        'SELECT DISTINCT students.id AS students_id, CONCAT (students.first_name," ",students.last_name) AS students_name FROM students', 
    (err, results) => {
        if (err) {
            cb(err);
            return;
             }
        cb(null, results);
    });
}

//Query to get lessons names to show on the dropdown..  
function listAllLessons(cb) {
    connection.query(
        'SELECT DISTINCT id,name FROM lessons ', 
        (err, results) => {
        if (err) {
            cb(err);
            return;
             }
        cb(null, results);
    });
};

//Query to Send course details to the database..         
function addCourse(course, res) {
    connection.query('INSERT INTO `courses` (batch, name, year, from_date, to_date , day  ) VALUES ("'+ course.course_batch+'", "'+ course.course_name+'", "'+ course.course_year+'","'+ course.from_day+'", "'+ course.to_day+'" , "'+ course.course_day+'" )' , function (err, resp) {
            if (err) throw err;
            });
};

//Query to Send student of the course details to the database..         
function addStudent(student, res) {
    connection.query('INSERT INTO `students_in_course` (c_id, s_id ) VALUES ("'+ student.obj1+'", "'+ student.students_id+'" )' , function (err, resp) {
            if (err) throw err;
            });
};

//Add a Lesson to the database..
function addLesson(lesson, res) {
    connection.query('INSERT INTO `lessons` (name) VALUES ("'+ lesson.lesson_name+'")' , function (err, resp) {
            if (err) throw err;
            });
};

//Assign a Lesson to a course..
function addCourseLesson(courselesson, res) {
    connection.query('INSERT INTO `lessons_in_course` (c_id, l_id, held_date) VALUES ("'+ courselesson.obj1+'" , "'+ courselesson.id+'" , "'+ courselesson.date+'")' , function (err, resp) {
            if (err) throw err;
            });
};

//Query to Delete lesson from the course..    
function deleteLesson(lesson_id, cb) {
    connection.query(
        'DELETE FROM lessons_in_course WHERE (lessons_in_course.c_id = "'+lesson_id.c_id+'" AND lessons_in_course.l_id = "'+lesson_id.l_id+'")',
        (err, results) => {
        if (err) {
            cb(err);
            return;
             }
        cb(null, results);
    });
}

//Query to Delete student from the course..    
function deleteStudent(student_id, cb) {
    connection.query(
        'DELETE FROM students_in_course WHERE (students_in_course.c_id = "'+student_id.c_id+'" AND students_in_course.s_id = "'+student_id.id+'")',
        (err, results) => {
        if (err) {
            cb(err);
            return;
             }
        cb(null, results);
    });
}

//Query to update course details..        
function getEditCourse(edcourse, res) {
        connection.query(`UPDATE courses SET batch = '${edcourse.courses_batch}' , name =  '${edcourse.courses_name}', year = '${edcourse.courses_year}', from_date = '${edcourse.courses_from_date}', to_date = '${edcourse.courses_to_date}', day = '${edcourse.courses_day}' WHERE id = ${edcourse.courses_id}`,
        (err, res) => {
        if (err) {
            console.log(err); 
            return;
             }
    });
}        

//Query to update lesson date..        
function EditLessonDate(edlesson, res) {
        connection.query(`UPDATE lessons_in_course SET held_date = '${edlesson.day}'  WHERE (c_id = ${edlesson.c_id} AND l_id = ${edlesson.l_id})`,
        (err, res) => {
        if (err) {
            console.log(err); 
            return;
             }
    });
} 

//Query to Delete course from the list and from the database..    
function deleteCourse(delid, cb) {
    connection.query(
        'DELETE FROM courses WHERE id ='+ delid ,
        (err, results) => {
        if (err) {
            cb(err);
            return;
             }
        cb(null, results);
    });
}

//Query to Search Students..
function searchStudent (detail, cb) {
    connection.query(`SELECT * FROM students WHERE id LIKE '%${detail}%' OR concat(students.first_name," ",students.last_name) LIKE '%${detail}%' OR last_name LIKE '%${detail}%' OR date_of_birth LIKE '%${detail}%'  OR gender LIKE '%${detail}%' OR g_id LIKE '%${detail}%'`, function (err, res){
           if (err) {
           throw err;
           return;
            }
        cb(null ,res);
    });
}

//Query to Search Lessons..
function searchLessons (lesdetail, cb) {
    connection.query(`SELECT DISTINCT id, name FROM lessons WHERE name LIKE '%${lesdetail}%'`, function (err, res){
           if (err) {
           throw err;
           return;
            }
        cb(null ,res);
    });
}

//Get lesson to the frontend to check the validity..
function getLesson(lesson, cb) {
    connection.query(
        `SELECT name FROM lessons WHERE name = '${lesson}'`,function (err, res){
            if (err) {
            throw err;
            return;
            }
            cb(null ,res);
         });
 }

//Create the database..
function createSchema(config, cb) {
  const connection = database.createMultipleStatementConnection(config);
  connection.query(


`CREATE TABLE IF NOT EXISTS \`courses\` (
\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
\`batch\` VARCHAR(255) NULL,
\`name\` VARCHAR(255) NULL,
\`year\` VARCHAR(255) NULL,
\`from_date\` VARCHAR(10) NULL,
\`to_date\` VARCHAR(10) NULL,
\`day\` VARCHAR(20) NULL,
PRIMARY KEY (\`id\`))  ENGINE=INNODB;` +

`CREATE TABLE IF NOT EXISTS \`lessons\` ( 
\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
\`name\` VARCHAR(255) NULL,
PRIMARY KEY (\`id\`))  ENGINE=INNODB;`  +

`CREATE TABLE IF NOT EXISTS \`lessons_in_course\` (
\`c_id\` INT UNSIGNED NOT NULL,
\`l_id\` INT UNSIGNED NOT NULL,
\`held_date\` VARCHAR(10) NULL,
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
  addLesson            : addLesson,
  addStudent           : addStudent,
  addCourseLesson      : addCourseLesson,
  deleteLesson         : deleteLesson,
  deleteStudent        : deleteStudent,
  getEditCourse        : getEditCourse,
  EditLessonDate       : EditLessonDate,
  deleteCourse         : deleteCourse,
  listAllStudents      : listAllStudents,
  searchStudent        : searchStudent,
  listAllLessons       : listAllLessons,
  searchLessons        : searchLessons,
  getLesson            : getLesson,
  getCourseDetails     : getCourseDetails
  
};
