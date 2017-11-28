
'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();

function getStudent(studentId, cb) {
connection.query(
'select * from students where last_name LIKE ? %"' , [parseInt(studentId)], (err, results) => {
//this querry selects the student by any attribute but has to search the exact value...
if (err) {
cb(err);
return;
}
cb(null, results);
});  
}


function getguardian(guardianId, cb) {
connection.query(
'select * from guardians where name LIKE ? %"', [parseInt(guardianId)], (err, results) => {
//this querry selects the guardian by any attribute but has to search the exact value.. 
if (err) {
cb(err);
return;
}
cb(null, results);
});  
}

function listAllGuardians(cb) {
connection.query(
'select distinct guardians.id as guardians_id, guardians.name as guardians_name, ' +
'students.id as students_id, students.name as students_last_name, ' +
'from students ' +
'left outer join guardians on (students.guardians_id=students.id)', [], (err, results) => {
if (err) {
cb(err);
return;
}
cb(null, results);
});
}

function listGuardiansByIds(idArray, cb) {
connection.query(
'select distinct guardians.id as guardians_id, guardians.name as guardians_name, ' +
'students.id as students_id, students.name as students_last_name ' +
'from students ' +
'left outer join guardians on (students.guardians_id=students.id) ' +
'where students.id=?', idArray, (err, results) => {
if (err) {
cb(err);
return;
}
cb(null, results);
});
}

function createSchema (config, cb) {
const connection = database.createMultipleStatementConnection(config);
connection.query(

`CREATE TABLE IF NOT EXISTS \`guardians\` (
\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
\`name\` VARCHAR(255) NULL,
\`home_number\` VARCHAR(20) NULL,
\`mobile_number\` VARCHAR(20) NULL,
\`email_address\` VARCHAR(255) NULL,
PRIMARY KEY (\`id\`))  ENGINE=INNODB;` +
    
`CREATE TABLE IF NOT EXISTS \`students\` (
\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
\`first_name\` VARCHAR(255) NULL,
\`last_name\` VARCHAR(255) NULL,
\`date_of_birth\` VARCHAR(20) NULL,
\`home_address\` VARCHAR(255) NULL,
\`gender\` VARCHAR(255) NULL,
\`g_id\` INT UNSIGNED NOT NULL,
PRIMARY KEY (\`id\`))  ENGINE=INNODB;` + 


`ALTER TABLE \`students\` 
ADD FOREIGN KEY (\`g_id\`)   
REFERENCES \`guardians\`(\`id\`) 
ON UPDATE CASCADE
ON DELETE CASCADE;` ,

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
createSchema: createSchema,
listAllGuardians: listAllGuardians,
getStudent: getStudent,
getguardian: getguardian,
  
};