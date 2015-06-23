var request = require('supertest');
var assert = require("assert");
var config = require('./../config');
var weixin = require('./../../index');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/weixin', function(req, res){
  weixin.callback.auth.ack(req, res);
});

weixin.auth.init(config);

describe('Weixin callbacks\' tests', function () {

  it('should be able to auth weixin signature', function (done) {

    var token = config.appToken;
    var time = new Date().getTime();
    var nonce = 'nonce';
    var echostr = 'Hello world!';
    var signature = weixin.auth.generateSignature(token, time, nonce);
    var data = {
      signature: signature,
      timestamp: time,
      nonce: nonce,
      echostr: echostr
    };
    request(app)
      .post('/weixin')
      .send(data)
      .expect(200)
      .expect(echostr)
      .end(done);
  });

  it('should be failed to auth weixin signature', function (done) {

    var token = config.appToken;
    var time = new Date().getTime();
    var nonce = 'nonce';
    var echostr = 'Hello world!';
    var signature = weixin.auth.generateSignature(token, time, nonce);
    var data = {
      signature: signature,
      timestamp: time,
      nonce: nonce
    };
    request(app)
      .post('/weixin')
      .send(data)
      .expect(200)
      .expect('Input Invalid!')
      .end(done);
  });
});
