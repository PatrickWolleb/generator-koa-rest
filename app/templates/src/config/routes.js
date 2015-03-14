/**
 * Main application routes
 */

'use strict';

var mount = require('koa-mount');

module.exports = function(app) {

	// YEOMAN INJETC ROUTES BELOW
  app.use(mount('/', require('../api/root')));


};
