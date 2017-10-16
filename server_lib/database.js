// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.

'use strict';

const extend = require('lodash').assign;
const mysql = require('mysql');
const config = require('../server-config');

const options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: config.get('DATABASE')
};

if (config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production') {
  options.socketPath = `/cloudsql/${config.get('INSTANCE_CONNECTION_NAME')}`;
} else {
  options.host= config.get('HOST');
}

function createConnection(param) {
  let dbOptions = (param)? param: options;
  return mysql.createConnection(dbOptions);
}

function createMultipleStatementConnection(param) {
  let dbOptions = (param)? param: options;
  return mysql.createConnection(extend({
    multipleStatements: true
  }, dbOptions));
}


module.exports = {
  createConnection: createConnection,
  createMultipleStatementConnection: createMultipleStatementConnection
};
