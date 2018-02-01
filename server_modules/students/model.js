
// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.

'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();

//Query to get guardians from the database to show in the frontend (dropdown)..
function listAllGuardians(cb) {
    connection.query(
        'SELECT DISTINCT guardians.id AS guardians_id, guardians.name AS guardians_name FROM guardians', 
        (err, results) => {
            if (err) {
                cb(err);
                return;
            }
            cb(null, results);
        });
}

//Get email address to the frontend to check the validity..
function getEmail(email, cb) {
    console.log('Email : ', email);
    connection.query(
        `SELECT email_address FROM guardians WHERE email_address = '${email}'`,function (err, res){
            if (err) {
            throw err;
            return;
            }
            console.log('Result : ', res);
            cb(null ,res);
         });
 }

//Query to get students from the database to show in the list in the frontend..
function listAllStudents(cb) {
    connection.query(
        'SELECT DISTINCT students.id, CONCAT (students.first_name," ",students.last_name) AS students_name, students.date_of_birth AS date_of_birth, guardians.name AS g_name, students.home_address AS home_address, students.gender AS gender, students.g_id AS g_id FROM students LEFT OUTER JOIN guardians ON (students.g_id = guardians.id ) GROUP BY id ASC',
        (err, results) => {
            if (err) {
                cb(err);
                return;
            }
            cb(null, results);
            console.log(results);
        });
}


//Query to Send student details to the database..
function addStudents(student, res) {
    connection.query('INSERT INTO `students` (first_name, last_name, date_of_birth, home_address, gender, g_id ) VALUES ("'+ student.students_first_name+'", "'+ student.students_last_name+'","'+ student.students_date_of_birth+'", "'+ student.students_home_address+'", "'+ student.students_gender+'", "'+ student.guardians_name+'" )' , function (err, resp) {
            if (err) throw err; 
                if(err){
                  console.log(err);
                    }
           });
         };

        
//Query to update student details..        
function getEditStudent(edstudent, res) {
    console.log('edstudent : ', edstudent);
        connection.query(`UPDATE students SET first_name =  '${edstudent.students_first_name}', last_name = '${edstudent.students_last_name}', date_of_birth = '${edstudent.students_date_of_birth}', home_address = '${edstudent.students_home_address}', gender = '${edstudent.students_gender}' WHERE  id = ${edstudent.students_id}`,
        (err, res) => {
            if (err) {
                console.log(err); 
                return;
            }
            console.log('Result : ', res);
            // cb(null, results);
        });
}       


//Query to Send guardian details to the database..         
function addGuardians(guar, res) {
    connection.query('INSERT INTO `guardians` (name, home_number, mobile_number, email_address ) VALUES ("'+ guar.gname+'", "'+ guar.mnumber+'","'+ guar.hnumber+'", "'+ guar.eaddress+'" )' , function (err, resp) {
            if (err) throw err;
              });
        };

//Query to Assign a guardian with a student..
function assignGuardians(assguar, res) {
    connection.query('INSERT INTO `guardians` (name) VALUES ("'+ assguar.guardians_name+'")' , function (err, resp) {
            if (err) throw err;
              });
        };

//Query to Delete student from the list and from the database..    
function deleteStudent(delid, cb) {
    console.log('delete id in model: ' , delid);
    connection.query(
        'DELETE FROM students WHERE id ='+ delid ,
        (err, results) => {
            if (err) {
                cb(err);
                return;
            }
            cb(null, results);
        });
}

//Query to Search Guardians..
function searchGuardian (detail, cb) {
    console.log('detail: ', '%' + detail +'%'); 
    connection.query(`SELECT * FROM guardians WHERE id LIKE '%${detail}%' OR name LIKE '%${detail}%' OR home_number LIKE '%${detail}%' OR mobile_number LIKE '%${detail}%' OR email_address LIKE '%${detail}%'`, function (err, res){
           if (err) {
           throw err;
           console.log('Result : ', res);
           return;
           }
           console.log('Result 1 : ',res);
           cb(null ,res);
        });
}

//Create the database..
function createSchema(config, cb) {
    const connection = database.createMultipleStatementConnection(config);
    connection.query(

`CREATE TABLE IF NOT EXISTS \`guardians\` ( 
 \`id\` INT AUTO_INCREMENT,
 \`name\` VARCHAR(255) NULL,
 \`home_number\` VARCHAR(20) NULL,
 \`mobile_number\` VARCHAR(20) NULL,
 \`email_address\` VARCHAR(255) NULL,
 PRIMARY KEY (\`id\`))  ENGINE=INNODB;`  +

`CREATE TABLE IF NOT EXISTS \`students\` (
\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
\`first_name\` VARCHAR(255) NULL,
\`last_name\` VARCHAR(255) NULL,
\`date_of_birth\` VARCHAR(20) NULL,
\`home_address\` VARCHAR(255) NULL,
\`gender\` VARCHAR(255) NULL,
\`g_id\` INT ,
PRIMARY KEY (\`id\`))  ENGINE=INNODB;` +


`ALTER TABLE \`students\`
ADD FOREIGN KEY (\`g_id\`)
REFERENCES guardians(\`id\`)
ON UPDATE CASCADE ON 
DELETE CASCADE;` ,

(err) => {
    if (err) {
        throw err;
        }
    console.log('Successfully created schemas: students, guardians');
    connection.end();
    cb(null);
        }
    );
}


module.exports = {
    createSchema     : createSchema,
    listAllGuardians : listAllGuardians,
    listAllStudents  : listAllStudents,
    addStudents      : addStudents,
    addGuardians     : addGuardians,
    deleteStudent    : deleteStudent,
    getEditStudent   : getEditStudent,
    searchGuardian   : searchGuardian,
    getEmail         : getEmail
};
