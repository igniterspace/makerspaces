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

const async = require('async');
const express = require('express');
const images = require('../server_lib/images');
const path = require('path');

const router = express.Router();


/**
 * GET /spaces.index?location=1
 *
 * Display a page of books (up to ten at a time).
 */
router.get('/*',  (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client_dist', 'index.html'));
});

/**
 * Errors on "/books/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;
