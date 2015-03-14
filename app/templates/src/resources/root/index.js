'use strict';

var controller = require('./root.controller');
var router = require('koa-router')();

router.get('/', controller.index);
module.exports = router.routes();