'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logging = require('../../server_lib/logging');
const model = require('./model');

const errNotFound = {
code: 404,
message: 'Not found'
};

function getModel () {
return require(`./model`);
}

const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

/**
 * GET /api/students
 * 
 */
router.get('/', (req, res, next) => {
  
});

/**
* Errors on "/api/<module>/*" routes.
*/
router.use((err, req, res, next) => {
// Format error and forward to generic error handler for logging and
// responding to the request
err.response = {
message: err.message,
internalCode: err.code
};
next(err);
});

function getStudent () {
return require(`./model`);
}

function getGuardian () {
return require(`./model`);
}

if (user.appMetadata['access']['*']) {
// get all guardian

model.listAllGuardians((err, results) => {
if (err) {
throw err;
}
res.json({
items: structureGuardians(results)
});
});

} else {
var guardianIds = Object.keys(user.appMetadata['access']);
//remove * from the ids array
var index = guardianIds.indexOf('*');
if (index > -1) {
array.splice(index, 1);
}
// get specific guardian

model.listGuardiansByIds((err, results) => {
if (err) {
throw err;
}
res.json({
items: structureGuardians(results)
});
});

function structureGuardians(results) {
// create a composite user object
let guardians = {};
//add permissions if any
for (var i = 0; i < results.length; i++) {
let record = results[i];
//if guardian is not existing create it
if (!guardians[record.guardian_id]) {
guardians[record.guardian_id] = {
students : {},
name: record.students_last_name,
id: record.students_id
};
}
// add the guardian record
guardians[record.guardians_id].students[record.students_id] = {
students_id: record.students_id,
students_last_name: record.students_last_name,
}
}
return guardians;
}
}
module.exports = router;