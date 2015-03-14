'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var os = require('os');

xdescribe('koa-res:resource', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../resource'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('test_resource_name', '--force')
      .withOptions({ 'skip-install': true })
      .withPrompt({
        reviewed: 'y'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/api/test_resource_name/index.js',
      'src/api/test_resource_name/test_resource_name.controller.js',
      'src/api/test_resource_name/test_resource_name.spec.js',
    ]);
  });

  xit('replaces {{RESOURCE_NAME}} in spec file with promped value', function () {
      var rootController = fs.readFileSync(path.join(os.tmpdir(), './temp-test') + '/src/api/test_resource_name/test_resource_name.spec.js', 'utf-8');
      assert(rootController.indexOf('test_resource_name') !== -1, true);
  });


  xit('replaces {{RESOURCE_NAME}} in index file with promped value', function () {
      var rootController = fs.readFileSync(path.join(os.tmpdir(), './temp-test') + '/src/api/test_resource_name/index.js', 'utf-8');
      assert(rootController.indexOf('test_resource_name') !== -1, true);
  });
});
