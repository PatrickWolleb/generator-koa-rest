'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },


  prompting: function () {
    var done = this.async();
    this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your API name',
      default : this.appname // Default to current folder name
    },{
      type    : 'input',
      name    : 'portal',
      message : 'Your API docs URL',
      default : 'API Docs URL'
    }], function (answers) {
      this.name = answers.name;
      this.portal = answers.portal
      done();
    }.bind(this));


  },

  writing: {
    app: function () {

      var apiName = this.name;
      var portal = this.portal;

      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('src'),
        this.destinationPath('src')
      );
      this.fs.copy(
        this.templatePath('src/resources/root/root.controller.js'),
        this.destinationPath('src/resources/root/root.controller.js'), {
          process :  function (input) {
            var output = input.toString('utf-8')
                              .replace('{{API_NAME}}', apiName)
                              .replace('{{API_PORTAL}}', portal);
            return output;
          }
        }
      );
    },

    projectfiles: function () {

      this.fs.copy(
        this.templatePath('.editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copy(
        this.templatePath('.jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
