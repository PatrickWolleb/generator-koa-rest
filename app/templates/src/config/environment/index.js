'use strict';

var path = require('path');
var _ = require('lodash');

// Base config
var base = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,
  logType : 'dev'
};


// Overide base config with environment
module.exports = _.merge(base, require('./' + process.env.NODE_ENV + '.js') || {});