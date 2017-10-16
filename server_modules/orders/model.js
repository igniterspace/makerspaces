// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();

function list (locationId, limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  connection.query(
    'SELECT orders.*, locations.name as location_name, users.given_name as user_given_name, users.profile_image as user_profile_image ' + 
      'FROM `orders` LEFT OUTER JOIN locations ON (orders.location_id = locations.id) ' +
      'LEFT OUTER JOIN users ON (users.id = orders.user_id) ' + 
      'WHERE location_id=? LIMIT ? OFFSET ?', [locationId, limit, token],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      const hasMore = results.length === limit ? token + results.length : false;
      cb(null, results, hasMore);
    }
  );
}


function createSchema (config, cb) {
  const connection = database.createMultipleStatementConnection(config);
  connection.query(

    `CREATE TABLE IF NOT EXISTS \`orders\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`location_id\` INT UNSIGNED NOT NULL,
      \`user_id\` INT UNSIGNED NOT NULL,
      \`updated\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      \`created\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      \`shipped\` DATETIME NULL,
    PRIMARY KEY (\`id\`))  ENGINE=INNODB;` + 

    `CREATE TABLE IF NOT EXISTS \`order_items\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`order_id\` INT UNSIGNED NOT NULL,
      \`product_id\` INT UNSIGNED NOT NULL,
      \`note\` VARCHAR(255) NULL,
      \`quantity\`  INT DEFAULT 0,
    PRIMARY KEY (\`id\`))  ENGINE=INNODB;`  +

    `CREATE TABLE IF NOT EXISTS \`products\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`code\` VARCHAR(255) NOT NULL,
      \`name\` VARCHAR(255) NOT NULL,
      \`description\` VARCHAR(255) NULL,
    PRIMARY KEY (\`id\`))  ENGINE=INNODB;` +

    `ALTER TABLE \`orders\` 
      ADD FOREIGN KEY (\`location_id\`)   
      REFERENCES \`locations\`(\`id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;` +

    `ALTER TABLE \`orders\` 
      ADD FOREIGN KEY (\`user_id\`)   
      REFERENCES \`users\`(\`id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;` +

    `ALTER TABLE \`order_items\` 
      ADD FOREIGN KEY (\`product_id\`)   
      REFERENCES \`products\`(\`id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;` +
      
    `ALTER TABLE \`order_items\` 
      ADD FOREIGN KEY (\`order_id\`)   
      REFERENCES \`orders\`(\`id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;`,

    (err) => {
      if (err) {
        throw err;
      } 
      console.log('Successfully created schemas: orders, order_items, products');
      connection.end();
      cb(null);
    }
  );
}


module.exports = {
  createSchema: createSchema,
  list: list
};
