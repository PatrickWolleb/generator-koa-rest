/**
 * Koa config
 */

'use strict';

var config = require('./environment');
var morgan = require('koa-morgan');

module.exports = function(app) {
    
   // Logger 
   app.use(morgan.middleware(config.logType));
  
};