// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();


//Query to Search Lessons..
function searchStudentspayments (studentdetail, cb) {
  console.log('detail: ', '%' + studentdetail +'%');
  connection.query(`SELECT students_in_course.c_id AS course_id, students_in_course.s_id AS student_id ,
   CONCAT (courses.batch," ",courses.name) AS courses_name,
   CONCAT (students.first_name," ",students.last_name)
   AS students_name FROM students_in_course
   LEFT OUTER JOIN students ON (students_in_course.s_id = students.id)
   LEFT OUTER JOIN courses ON (students_in_course.c_id = courses.id) 
   WHERE concat(students.first_name," ",students.last_name) LIKE '%${studentdetail}%'`, function (err, res){
         if (err) {
         throw err;
         return;
        }
      cb(null ,res);
  });
}

//Query to Send payment details to the database..         
function addPayment(payment, res) {
  connection.query('INSERT INTO `payments` ( c_id, s_id, user_id, date, amount ) VALUES ( "'+ payment.course_id+'" , "'+ payment.student_id+'" , "'+ payment.userid+'" , "'+ payment.today+'" , "'+ payment.amount_paid+'")' , function (err, resp) {
          if (err) throw err;
          });
};

//Query to get payments from payments table to show in the frontend..  
function getAllPayments(details,cb) {
  connection.query(`SELECT payments.p_id AS payment_id, payments.c_id AS course_id, 
     payments.s_id AS student_id  , payments.user_id AS user_id , payments.date AS date , 
     payments.amount AS amount_paid , CONCAT (users.given_name," ",users.family_name) AS user_name,
     CONCAT (students.first_name," ",students.last_name) AS students_name,
     CONCAT (courses.batch," ",courses.name) AS course_name
     FROM payments LEFT OUTER JOIN users ON (payments.user_id = users.id)
     LEFT OUTER JOIN students ON (payments.s_id = students.id)
     LEFT OUTER JOIN courses  ON (payments.c_id = courses.id)  
     WHERE c_id= ? AND s_id= ?
     ORDER BY date ASC `,[details.c_id , details.s_id], (err, results) => {
        if (err) {
        cb(err);
        return;
         }
    cb(null, results);
  });
};

function getSumPayments(details,cb) {
  connection.query(`SELECT SUM(payments.amount) AS total_payment
  FROM payments LEFT OUTER JOIN users ON (payments.user_id = users.id)
     LEFT OUTER JOIN students ON (payments.s_id = students.id)
     LEFT OUTER JOIN courses  ON (payments.c_id = courses.id)  
     WHERE c_id= ? AND s_id= ? ` ,[details.c_id , details.s_id], (err, results) => {
      if (err) {
      cb(err);
      return;
       }
  cb(null, results);
  });
};

//Create the database..
function createSchema(config, cb) {
    const connection = database.createMultipleStatementConnection(config);
    connection.query(
  
  
  `CREATE TABLE IF NOT EXISTS \`payments\` (
  \`p_id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`c_id\` INT UNSIGNED NOT NULL,
  \`s_id\` INT UNSIGNED NOT NULL,
  \`user_id\` INT UNSIGNED NOT NULL,
  \`date\` VARCHAR(10) NULL,
  \`amount\` VARCHAR(20) NULL,
  PRIMARY KEY (\`p_id\`))  ENGINE=INNODB;` +
  
  `ALTER TABLE \`students_in_course\`
  ADD FOREIGN KEY (\`c_id\`)
  REFERENCES \`courses\`(\`id\`)
  ON UPDATE CASCADE 
  ON DELETE CASCADE;` +
  
  `ALTER TABLE \`students_in_course\`
  ADD FOREIGN KEY (\`s_id\`)
  REFERENCES \`students\`(\`id\`)
  ON UPDATE CASCADE 
  ON DELETE CASCADE;` ,
  
  (err) => {
    if (err) {
        throw err;
        }
    console.log('Successfully created schemas: payments');
    connection.end();
    cb(null);
        }
    );
  }
  
  module.exports = {
    createSchema             : createSchema,
    searchStudentspayments   : searchStudentspayments,
    addPayment               : addPayment,
    getAllPayments           : getAllPayments,
    getSumPayments           : getSumPayments
  };