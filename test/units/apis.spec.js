var assert = require("assert");
var config = require('./../config');
var weixin = require('./../../index');

var validator = require('validator');

var access_token = null;
describe("Weixin apis Test", function () {
  it('should be able to get a token', function(done) {
    weixin.api.tokenize(function(error, json) {
      assert(true, !!json.access_token);
      assert(true, validator.isNumeric(json.expire_in));
      access_token = json.access_token;
      done();
    });
  });
});

