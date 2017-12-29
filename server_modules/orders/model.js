// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const database = require('../../server_lib/database');
const connection = database.createConnection();

function list(locationId, limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  connection.query(
    'SELECT orders.*, locations.name as location_name ,users.given_name as user_given_name, users.profile_image as user_profile_image ' +
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

//Written new
//Get order history
function getOrderHistory(cb) {
  connection.query(
    'SELECT order_id,users.given_name as user_name, created_date, updated_date, shipped, SUM(inventory_items.quantity * inventory_items.unit_price) AS total_price FROM orders LEFT OUTER JOIN orders_inventory_items ON (orders.order_id = orders_inventory_items.o_id) LEFT OUTER JOIN inventory_items ON (orders_inventory_items.i_id = inventory_items.item_id) LEFT OUTER JOIN users ON (users.id = orders.user_id) GROUP BY order_id DESC',
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
}


// get orderitem history
function getOrderItemHistory(orderId, cb) {
  console.log(orderId);
  connection.query(
    'SELECT order_id, products.name AS order_item, CONCAT(products.description, inventory_items.note) AS description, quantity, unit_price, (inventory_items.quantity * inventory_items.unit_price) AS total_price FROM orders LEFT OUTER JOIN orders_inventory_items ON (orders.order_id = orders_inventory_items.o_id) LEFT OUTER JOIN inventory_items ON (orders_inventory_items.i_id = inventory_items.item_id) LEFT OUTER JOIN product_inventory_items ON(orders_inventory_items.i_id = product_inventory_items.i_id) LEFT OUTER JOIN products ON (product_inventory_items.p_id = products.product_id) LEFT OUTER JOIN users ON (users.id = orders.user_id) WHERE order_id=?',[orderId],
    function (err, results) {
      console.log(err);
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
}

// Get products names
function getProducts(cb) {
  connection.query(
    'SELECT * FROM products GROUP BY product_id ASC',
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results);
    }
  );
}

//Post orders
function submitOrder(order, cb) {
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    connection.query(
      'INSERT INTO  ( location_id, user_id, created_date, shipped ) VALUES (1, 1, "'+mysqlTimestamp+'", "'+mysqlTimestamp+'")',
      (err, results) => {
        if (err) {
          cb(err);
          return;
        }
        cb(null, results);
      }
    );
  }



// Functions For insert data to tables
//For inventory items table
// function insertInventory(order, cb) {
//   var order_length = order.length ;
//   console.log("Length is " + order_length);
//   for (var i = 0 ; i < order_length; i++ ) {
//   connection.query( 
//     'INSERT INTO inventory_items ( note, quantity, unit_price ) VALUES ("'+order[i].note+'", '+order[i].quantity+', '+order[i].unitprice+')',
//     (err, results) => {
//       if (err) {
//         cb(err);
//         return;
//       }
//       cb(null, results);
//     }
//   );
//   }
// }




function createSchema(config, cb) {
  const connection = database.createMultipleStatementConnection(config);
  connection.query(

    //Order Table

    `CREATE TABLE IF NOT EXISTS \`orders\` (
      \`order_id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`location_id\` INT UNSIGNED NOT NULL,
      \`user_id\` INT UNSIGNED NOT NULL,
      \`created_date\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      \`shipped\` DATETIME NULL,
    PRIMARY KEY (\`order_id\`))  ENGINE=INNODB;` +

    //Inventory Items table //total price not needed

    `CREATE TABLE IF NOT EXISTS \`inventory_items\` (
      \`item_id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`note\` VARCHAR(255) NOT NULL,
      \`quantity\` INT ,
      \`unit_price\` INT UNSIGNED NOT NULL,
      \`total_price\` INT DEFAULT 0,   
    PRIMARY KEY (\`item_id\`))  ENGINE=INNODB;`  +

    //Products Table

    `CREATE TABLE IF NOT EXISTS \`products\` (
      \`product_id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`code\` VARCHAR(255) NOT NULL,
      \`name\` VARCHAR(255) NOT NULL,
      \`description\` VARCHAR(255) NULL,
      \`has_quantity\` INT DEFAULT 0,
    PRIMARY KEY (\`product_id\`))  ENGINE=INNODB;` +

    //Order Inventory Items table

    `CREATE TABLE IF NOT EXISTS \`orders_inventory_items\` (
      \`o_id\` INT UNSIGNED NOT NULL,
      \`i_id\` INT UNSIGNED NOT NULL,
    PRIMARY KEY (\`o_id\`, \`i_id\`))  ENGINE=INNODB;`  +

    //Prduct Inventory Items table

    `CREATE TABLE IF NOT EXISTS \`product_inventory_items\` (
      \`i_id\` INT UNSIGNED NOT NULL,
      \`p_id\` INT UNSIGNED NOT NULL,
      PRIMARY KEY (\`i_id\`, \`p_id\`))  ENGINE=INNODB;` +


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

    `ALTER TABLE \`orders_inventory_items\` 
      ADD FOREIGN KEY (\`o_id\`)   
      REFERENCES \`orders\`(\`order_id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;` +

    `ALTER TABLE \`orders_inventory_items\` 
      ADD FOREIGN KEY (\`i_id\`)   
      REFERENCES \`inventory_items\`(\`item_id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;` +

    `ALTER TABLE \`product_inventory_items\` 
      ADD FOREIGN KEY (\`p_id\`)   
      REFERENCES \`products\`(\`product_id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;` +

    `ALTER TABLE \`product_inventory_items\` 
      ADD FOREIGN KEY (\`i_id\`)   
      REFERENCES \`inventory_items\`(\`item_id\`) 
      ON UPDATE CASCADE
      ON DELETE CASCADE;`
    ,


    (err) => {
      if (err) {
        throw err;
      }
      console.log('Successfully created schemas: orders, inventory items, products, order inventory items, product inventory items tables');
      connection.end();
      cb(null);
    }
  );
}


module.exports = {

  createSchema: createSchema,
  list                : list,
  getOrderHistory     : getOrderHistory,
  getOrderItemHistory : getOrderItemHistory,
  getProducts         : getProducts,
  submitOrder         : submitOrder

};
