// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.

'use strict';

const config = require('../server-config');
const database = require('../server_lib/database');
const databaseName = config.get('DATABASE');

if (module === require.main) {
  const prompt = require('prompt');
  prompt.start();

  console.log(
    `Running this script directly will allow you to initialize your mysql
    database with sample data.\n`);

  prompt.get(['user', 'password'], (err, result) => {

    const connection = database.createMultipleStatementConnection(result);

    if (err) {
      return;
    }
    //create the database
    connection.query(
       `USE \`` + databaseName + `\`;` + 
       
      'DELETE FROM users;' + 
      'DELETE FROM locations;' + 
      'DELETE FROM organizations;' + 

      'INSERT INTO organizations(id, name, description) VALUES ' +
      '(1, \'IgniterSpace Sri Lanka\', \'Igniter Global own subsidiary\'),'+
      '(2, \'AIS\', \'Asian International School\');' + 
      
      'INSERT INTO locations(id, name, description, organization_id) VALUES ' +
      '(1, \'IS Gampaha\', \'2nd makerspace of IgniterSpace\', 1),'+
      '(2, \'IS Narahenpita\', \'1st makerspace of IgniterSpace\', 1),' + 
      '(3, \'IS Negombo\', \'3rd makerspace of IgniterSpace\', 1),' + 
      '(4, \'AIS Colombo\', \'IgniterSpace franchise at Asian International School\', 2);'  +

      'INSERT INTO users(id, auth_provider, auth_ref, given_name, family_name, email, profile_image) VALUES ' +
      '(1, \'google\', \'00001\', \'Hasith\', \'Yaggahavita\', \'hasith@igniterspace.com\', \'\'),' +
      '(2, \'google\', \'00002\', \'Jehan\', \'Wijesinghe\', \'jehan@igniterspace.com\', \'\'),'  +
      '(3, \'google\', \'00002\', \'Harshana\', \'Wijesinghe\', \'harshanax@oki.lk\', \'\'),'  +
      '(4, \'google\', \'00003\', \'Hasith\', \'Yaggahavita\', \'hasith@gmail.com\', \'\');'  +

      'INSERT INTO orders(order_id, location_id, user_id, created_date, shipped) VALUES ' +
      '(1, 1, 1, \'2012-02-26 09:31:01\' , \'2013-02-28 08:30:00\' ),'+
      '(2, 3, 2, \'2016-01-14 05:52:02\' , \'2014-05-25 05:30:50\' ),'+
      '(3, 2, 3, \'2014-02-26 10:33:03\' , \'2015-02-28 08:30:00\' ),'+
      '(4, 4, 4, \'2016-02-26 11:34:04\' , \'2016-02-28 08:30:00\' ),'+
      '(5, 2, 1, \'2017-02-26 12:35:05\' , \'2017-02-28 08:30:00\' ),'+
      '(6, 1, 2, \'2017-02-26 14:36:06\' , \'2017-02-28 08:30:00\' );' +

      'INSERT INTO inventory_items(item_id, note, quantity, unit_price) VALUES ' +
      '(1,\'Small, red\', 100, 120),'+
      '(2, \'Small, red\', 20, 70),'+
      '(3,\'Small, red\', 35, 20),'+
      '(4,\'Small, red\', 300, 4),'+
      '(5,\'Small, red\', 500, 8),'+
      '(6,\'Small, red\', 3000, 2),'+
      '(7,\'Small, red\', 400, 8),'+
      '(8,\'Small, red\', 900, 20),'+
      '(9,\'Small, red\', 48, 120),'+
      '(10,\'Small, red\', 90, 20);'+

      'INSERT INTO products(product_id, code, name, description, has_quantity) VALUES ' +
      '(1, \'qwer\', \'Cube\',\'Small, Wooden\', 100),'+
      '(2, \'tyui\', \'gear motor\', \'medium size\',50),'+
      '(3, \'iopa\', \' cube\', \'Large ,Plastic\',40),'+
      '(4, \'sdfg\', \'ice cream stick\', \'Yellow color ,Large\',20),'+
      '(5, \'hjkl\', \'insulate wire\',\'Red color\', 5),'+
      '(6, \'zxcv\', \'stepper motor\', \'240V , Large\',4);' +

      'INSERT INTO orders_inventory_items(o_id, i_id) VALUES ' +
      '(1, 2),'+
      '(1, 7),'+
      '(2, 10),'+
      '(2, 9),'+
      '(3, 5),'+
      '(3, 6),'+
      '(4, 4),'+
      '(5, 1),'+
      '(6, 3),'+
      '(4, 8);'+

      'INSERT INTO product_inventory_items( i_id, p_id ) VALUES ' +
      '(1, 2),'+
      '(2, 3),'+
      '(3, 4),'+
      '(4, 1),'+
      '(5, 6),'+
      '(6, 5),'+
      '(7, 2),'+
      '(8, 3),'+
      '(9, 2),'+                  
      '(10,6);'
      
      ,

      (err) => {
        if (err) {
          throw err;
        }
        console.log('Successfully inserted sample data to the database');
        connection.end();
      }
    );
  });
}
