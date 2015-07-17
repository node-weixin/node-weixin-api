var auth = require("./../auth");
var validator = require("node-form-validator");
var config = require('../validate-config/auth');


module.exports = {
  ack: function(req, res, errors) {
    errors = errors || global.errors || require("web-errors").errors;

    var data = {};
    var error = {};
    var signature = {};

    var conf = config.basic;

    if (!validator.v(req, conf, data, error)) {
      res.send(errors.INPUT_INVALID);
      return;
    }
    var check = auth.check(data.signature, data.timestamp, data.nonce)
    if (check) {
      signature = data;
      res.send(data.echostr);
    } else {
      res.send(errors.SIGNATURE_NOT_MATCH);
    }
  }
};
