'use strict';

var controller = require('./{{RESOURCE_NAME}}.controller');
var router = require('koa-router')();

router.get('/', controller.index);
module.exports = router.routes();