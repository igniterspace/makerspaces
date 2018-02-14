// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();

function listAllByOrganization (organization_id, cb) {
  connection.query(
    'select distinct users.* from organizations ' +
    'inner join locations on (organizations.id = locations.organization_id) ' +
    'inner join permissions on (permissions.location_id=locations.id) ' +
    'inner join users on (permissions.user_id=users.id) where organizations.id=?', [organization_id],
    function (err, results) {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    });
}


function readByEmail (email, cb) {
  connection.query(
    'select * from users where email=?', email, function (err, results){
      if (!err && !results.length) {
        err = {
          code: 404,
          message: 'Not found'
        };
      }
      if (err) {
        cb(err);
        return;
      }
      // create a composite user object
      var user = {
        id: results[0].id,
        auth_provider: results[0].auth_provider,
        auth_ref: results[0].auth_ref,
        given_name: results[0].given_name,
        family_name: results[0].family_name,
        email: results[0].email,
        profile_image: results[0].profile_image
      };

      cb(null, user);
    });
}


function create (data, cb) {
  if (!data.email) {
    var err = {
      code: 422,
      message: 'Unprocessable entity'
    };
    cb(err);
  }
  connection.query('INSERT INTO `users` SET ?', data, function(err, res) {
    if (err) {
      cb(err);
      return;
    }
    readByEmail(data.email, cb);
  });
}


function updateByEmail (email, data, cb) {
  connection.query(
    'UPDATE `users` SET ? WHERE `email` = ?', [data, email], function (err) {
      if (err) {
        cb(err);
        return;
      }
      readByEmail(email, cb);
    });
}


function createSchema (config, cb) {
  const connection = database.createMultipleStatementConnection(config);

  connection.query(

    'CREATE TABLE IF NOT EXISTS users ( id INT UNSIGNED NOT NULL AUTO_INCREMENT,auth_provider VARCHAR(255) NULL,auth_ref VARCHAR(255) NULL,given_name VARCHAR(255) NULL,family_name VARCHAR(255) NULL,email VARCHAR(255) NULL,profile_image VARCHAR(255) NULL,PRIMARY KEY (id)) ENGINE=INNODB;' ,

    function (err) {
      if (err) {
        throw err;
      }
      console.log('Successfully created schemas: users, permissions');
      connection.end();
      cb();
    }
  );
}

module.exports = {
  createSchema: createSchema,
  listAllByOrganization: listAllByOrganization,
  readByEmail: readByEmail,
  create: create,
  updateByEmail: updateByEmail
};
