// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.


'use strict';

const oauth2 = require('../../server_lib/oauth2');
const logging = require('../../server_lib/logging');

function getModel () {
  return require(`./model`);
}

/**
* Get the access levels user has to the given location
*/
function getLocationAccess(user, locationId, cb) {
  
  getModel().getLocation(locationId, (err, results)=>{
    if (err) {
      throw err;
    }
    if (results && results.length) {
      let location = {
        id: locationId,
        name: results[0].name
      };

      findPermissions(user, locationId, (err, permissions) =>{
        location.permissions = permissions;
        cb(null, location);
      });
    }
    

  });
}
function findPermissions(user, locationId, cb) {
  if (oauth2.isAdmin(user)) {
    cb(null, {
      'orders': 'write', 
      'students': 'write', 
      'classes': 'write', 
      'attendance': 'write',
      'administration': 'write'
    });
  } else {
    getModel().getPermissions(user.id, locationId, (err, results)=>{
      if (err) {
        throw err;
      }
      let permissions = {};
      for (let i=0; i<results.length; i++) {
        permissions[results[i].entity] = results[i].level;
      }
      cb(err, permissions);
    });
  }
}

/**
 * Lists the locations the user has access to
 */
function getLocations(user, cb) {
  if (oauth2.isAdmin(user)) {
    //admin user return all makerspaces
    getModel().listAllLocations((err, entities) => {
      cb(err, entities);
    });
  } else {
    //standard user, send only locations she has access to
    getModel().listAccessibleLocations(user.id, (err, entities) => {
      cb(err, entities);
    });
  }
}

module.exports = {
  getLocations: getLocations,
  getLocationAccess: getLocationAccess
};
