'use strict';


var app = require('../../server');
var request = require('supertest').agent(app.listen());

var expect = require('chai').expect;
var should = require('should');


describe('GET /', function(){
  it('should respond with 403', function(done){
    request
    .get('/')
    .expect(403, done);
  });
});