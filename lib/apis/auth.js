var auth = require("./../auth");
var validator = require("req-validator");
var errors = require("web-errors").errors;

module.exports = function(req, res) {
  var data = {};
  var error = {};

  var conf = {
    signature : {
      type: 'string',
      minLength: 3,
      maxLength: 64,
      required: true
    },

    timestamp: {
      type: 'string',
      minLength: 3,
      maxLength: 64,
      required: true
    },
    nonce: {
      type: 'string',
      required: true
    },
    echostr: {
      type: 'string',
      required: true
    }
  };

  if (!validator.v(req, conf, data, error)) {
      res.send('Input Invalid!');
      return;
  }
  var check = auth.check(data.signature, data.timestamp, data.nonce)
    if (check) {
      res.send(data.echostr);
    } else {
      res.send('Signature not match!');
    }
};
