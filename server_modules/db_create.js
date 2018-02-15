// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.

'use strict';

const databaseName = require('../server-config').get('DATABASE');
const database     = require('../server_lib/database');


const makerspaces_model = require('./locations/model');
const users_model = require('./users/model');
const orders_model = require('./orders/model');
const students_model = require('./students/model');
const courses_model = require('./courses/model');
const attendance_model  = require('./attendance/model');


if (module === require.main) {
  const prompt = require('prompt');
  prompt.start();

  console.log(
    `******** WARNING *********\n This script will DROP the tables and recreate.\n`);

  prompt.get(['user', 'password'], (err, result) => {
    if (err) {
      return;
    }

    const connection = database.createMultipleStatementConnection(result);
    //create the database
    connection.query(
      `DROP DATABASE IF EXISTS `  + databaseName + `;` +
      `CREATE DATABASE IF NOT EXISTS \`` + databaseName + `\`
        DEFAULT CHARACTER SET = 'utf8'
        DEFAULT COLLATE 'utf8_general_ci';` ,
      `USE \`` + databaseName + `\`;`  ,
      (err) => {
        if (err) {
          throw err;
        }
        console.log('Successfully created the database');
        connection.end();
        //create tables

        result.database = databaseName;
        makerspaces_model.createSchema(result, () => {
          users_model.createSchema(result, ()=>{
            orders_model.createSchema(result, ()=>{             
                students_model.createSchema(result, ()=>{
                  courses_model.createSchema(result, ()=>{
                    attendance_model.createSchema(result, ()=>{
              
                });              
               });
             });
            });
          });
        });
        
        
      }
    );
    
  });
}