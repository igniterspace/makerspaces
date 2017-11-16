// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Hierarchical node.js configuration with command-line arguments, environment
// variables, and files.
const nconf = module.exports = require('nconf');
const path = require('path');

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'CLOUD_BUCKET',
    'GCLOUD_PROJECT',
    'MEMCACHE_URL',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'NODE_ENV',
    'OAUTH2_CLIENT_ID',
    'OAUTH2_CLIENT_SECRET',
    'OAUTH2_CALLBACK',
    'SECRET',
    'PORT'
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'server-config.json') })
  // 4. Defaults
  .defaults({
    // Typically you will create a bucket with the same name as your project ID.
    CLOUD_BUCKET: 'makerspace-management-system',

    // This is the id of your project in the Google Cloud Developers Console.
    GCLOUD_PROJECT: 'makerspace-management-system',

    // Connection url for the Memcache instance used to store session data
    MEMCACHE_URL: 'memcached-17156.c1.us-central1-2.gce.cloud.redislabs.com:17156',

    INSTANCE_CONNECTION_NAME: 'makerspace-management-system:us-central1:ig-dev', //production setting
    
    HOST: '127.0.0.1', //local development setting
    DATABASE: 'makerspaces',
    MYSQL_USER: 'root',
    MYSQL_PASSWORD: '19931106Fuckingshit', 

    OAUTH2_CLIENT_ID: '1066178941676-5vmds16v7est58pstn2gdfna56542eve.apps.googleusercontent.com',
    OAUTH2_CLIENT_SECRET: 'Gbc33FRodnhcBSZU8glFC8I8',
    OAUTH2_CALLBACK: 'http://localhost:8080/auth/google/callback', //for local development

    // Set this a secret string of your choosing to used for memcache store
    SECRET: 'keyboardcat',

    PORT: '8080',

    NODE_ENV: 'development',

    //set this only for the production deployment
    //NODE_ENV: 'production',
    //OAUTH2_CALLBACK: "https://makerspace-management-system.appspot.com/auth/google/callback",
  });

// Check for required settings
checkConfig('GCLOUD_PROJECT');
checkConfig('CLOUD_BUCKET');
checkConfig('OAUTH2_CLIENT_ID');
checkConfig('OAUTH2_CLIENT_SECRET');

checkConfig('MYSQL_USER');
checkConfig('MYSQL_PASSWORD');
checkConfig('DATABASE');
if (nconf.get('NODE_ENV') === 'production') {
  checkConfig('INSTANCE_CONNECTION_NAME');
} else {
  checkConfig('HOST');
}

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set ` + setting + ` as an environment variable or in config.json!`);
  }
}
