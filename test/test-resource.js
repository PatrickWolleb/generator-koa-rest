'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var fs = require('fs-extra');
var os = require('os');

describe('koa-res:resource', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../resource'))
      .inDir(path.join(os.tmpdir(), './temp-test'), function (dir) {
        fs.copySync(path.join(__dirname, '../app/templates/src'), dir + '/src')
      })
      .withArguments('test_resource_name', '--force')
      .withOptions({ 'skip-install': true })
      .withPrompt({
        reviewed: 'y'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/resources/test_resource_name/index.js',
      'src/resources/test_resource_name/test_resource_name.controller.js',
      'src/resources/test_resource_name/test_resource_name.spec.js',
    ]);
  });

  it('replaces {{RESOURCE_NAME}} in spec file with promped value', function () {
      var rootController = fs.readFileSync(path.join(os.tmpdir(), './temp-test') + '/src/resources/test_resource_name/test_resource_name.spec.js', 'utf-8');
      assert(rootController.indexOf('test_resource_name') !== -1, true);
  });


  it('replaces {{RESOURCE_NAME}} in index file with promped value', function () {
      var rootController = fs.readFileSync(path.join(os.tmpdir(), './temp-test') + '/src/resources/test_resource_name/index.js', 'utf-8');
      assert(rootController.indexOf('test_resource_name') !== -1, true);
  });
});
