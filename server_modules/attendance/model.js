// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();







function createSchema(config, cb) 
{
    const connection = database.createMultipleStatementConnection(config);
    connection.query(

      `CREATE TABLE IF NOT EXISTS \`attendace\` (
        \`attendance_id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`lesson_id\` INT UNSIGNED NOT NULL,
        \`course_id\` INT UNSIGNED NOT NULL,
        \`student_id\` VARCHAR(255),
        \`att_date\` VARCHAR(255),
      PRIMARY KEY (\`order_id\`))  ENGINE=INNODB;` +

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

    createSchema        : createSchema
  
  };
  