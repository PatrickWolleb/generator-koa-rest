'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');

describe('koa-rest:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        name: 'Test API TEST',
        portal : 'http://dev.api.com'
      })
      .on('end', done);
  });

  it('creates project files', function () {
    assert.file([
      '.buildignore',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jshintrc',
      '.jshintrc-spec',
      'package.json',
      'src/server.js',
      'src/config/routes.js',
      'src/config/koa.js',
      'src/config/environment/index.js',
      'src/config/environment/local.js',
      'src/config/environment/development.js',
      'src/config/environment/test.js',
      'src/config/environment/production.js',
      'src/api/root/index.js',
      'src/api/root/root.controller.js',
      'src/api/root/root.spec.js',
    ]);
  });

  it('replaces {{API_NAME}} and {{API_PORTAL}} on root controller file with promped values', function () {
      var rootController = fs.readFileSync(path.join(os.tmpdir(), './temp-test') + '/src/api/root/root.controller.js', 'utf-8');
      assert(rootController.indexOf('Test API TEST') !== -1, true);
      assert(rootController.indexOf('http://dev.api.com') !== -1, true);
  });
});
