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


        (err) => {
            if (err) {
              throw err;
            }
            connection.end();
            cb(null);
          }
    );
}

module.exports = {

    createSchema        : createSchema
  
  };
  