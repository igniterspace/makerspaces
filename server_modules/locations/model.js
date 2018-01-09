// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();

function getLocation(locationId, cb) {
  connection.query(
    'select * from locations where (id=?)', [parseInt(locationId)], (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    });  
}

function listAllLocations(cb) {
  connection.query(
    // 'select distinct organizations.id as organization_id, organizations.name as organization_name, ' +
    // 'locations.id as location_id, locations.name as location_name ' +
    // 'from locations ' +
    // 'left outer join organizations on (locations.organization_id=organizations.id)', [], (err, results) => {
    //   if (err) {
    //     cb(err);
    //     return;
    //   }
  'SELECT * FROM students', [], (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    });
}

function listLocationsByIds(idArray, cb) {
  connection.query(
    'select distinct organizations.id as organization_id, organizations.name as organization_name, ' +
    'locations.id as location_id, locations.name as location_name ' +
    'from locations ' +
    'left outer join organizations on (locations.organization_id=organizations.id) ' +
    'where locations.id=?', idArray, (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    });
}


function createSchema(options, cb) {
  const connection = database.createMultipleStatementConnection(options);

  connection.query(
    `CREATE TABLE IF NOT EXISTS \`organizations\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(255) NULL,
      \`description\` TEXT NULL,
    PRIMARY KEY (\`id\`)) ENGINE=INNODB;` +

    `CREATE TABLE IF NOT EXISTS \`locations\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(255) NULL,
      \`description\` TEXT NULL,
      \`organization_id\` INT UNSIGNED NOT NULL ,
    PRIMARY KEY (\`id\`)) ENGINE=INNODB;` +

    `ALTER TABLE \`locations\` 
      ADD FOREIGN KEY (\`organization_id\`)   
      REFERENCES \`organizations\`(\`id\`) 
      ON UPDATE CASCADE
      ON DELETE RESTRICT;`,
    (err) => {
      if (err) {
        throw err;
      }
      console.log('Successfully created schemas: organizations, locations');
      connection.end();
      cb();
    }
  );
}


module.exports = {
  createSchema: createSchema,
  listLocationsByIds: listLocationsByIds,
  listAllLocations: listAllLocations,
  getLocation: getLocation
};