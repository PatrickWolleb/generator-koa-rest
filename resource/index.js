'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');



module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'Creates a new REST resource'
    });

    this.log('You called the KoaRest subgenerator with the argument ' + this.name + '.');
  },

   prompting: function () {
    var done = this.async();
    this.prompt([{
      type    : 'input',
      name    : 'reviewed',
      message : 'Have you peer reviewed your idea of the RESTful resource you are about to create.\n',
      default : 'n' 
    }], function (answers) {
      if(answers.reviewed.toLowerCase().indexOf('y') === -1 ) {
        this.log('Please peer review your RESTful resource, write the spec in RAML and show it to your test engineers. It may save you some time ;D')
      } else {
        done()
      }
    }.bind(this));
  },

  writing: function () {
    var resourceName = this.arguments[0];

    this.mkdir('src/api/' + resourceName);
    
    this.fs.copy(
      this.templatePath('_resource/index.js'),
      this.destinationPath('src/api/' + resourceName + '/index.js'),{
        process :  function (input) {
            var output = input.toString('utf-8')
                              .replace('{{RESOURCE_NAME}}', resourceName);           
            return output;
          }
      }
    );

    this.fs.copy(
      this.templatePath('_resource/controller.js'),
      this.destinationPath('src/api/' + resourceName + '/' + resourceName + '.controller.js')
    );


    this.fs.copy(
      this.templatePath('_resource/spec.js'),
      this.destinationPath('src/api/' + resourceName + '/' + resourceName + '.spec.js'),{
        process :  function (input) {
            var output = input.toString('utf-8')
                              .replace('{{RESOURCE_NAME}}', resourceName)  
                              .replace('{{RESOURCE_NAME}}', resourceName);    
            return output;
          }
      }
    );

    var routeConfig = {
      file: 'src/config/routes.js',
      needle: '// YEOMAN INJETC ROUTES BELOW',
      splicable: [
        "\tapp.use(mount('/" + resourceName +"', require('../api/" + resourceName + "')));"
      ]
    };
    rewriteFile(routeConfig);

   

  }
});


function rewriteFile (args) {
  args.path = args.path || process.cwd();
  var fullPath = path.join(args.path, args.file);

  args.haystack = fs.readFileSync(fullPath, 'utf8');
  var body = rewrite(args);

  fs.writeFileSync(fullPath, body);
}

function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite (args) {
  // check if splicable is already in the body text
  var re = new RegExp(args.splicable.map(function (line) {
    return '\s*' + escapeRegExp(line);
  }).join('\n'));

  if (re.test(args.haystack)) {
    return args.haystack;
  }

  var lines = args.haystack.split('\n');

  var otherwiseLineIndex = -1;
  lines.forEach(function (line, i) {
    if (line.indexOf(args.needle) !== -1) {
      otherwiseLineIndex = i;
    }
  });
  if(otherwiseLineIndex === -1) return lines.join('\n');

  var spaces = 0;
  while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
    spaces += 1;
  }

  var spaceStr = '';
  while ((spaces -= 1) >= 0) {
    spaceStr += ' ';
  }

  lines.splice(otherwiseLineIndex + 1, 0, args.splicable.map(function (line) {
    return spaceStr + line;
  }).join('\n'));

  return lines.join('\n');
}