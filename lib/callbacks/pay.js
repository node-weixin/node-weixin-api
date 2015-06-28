var auth = require("./../auth");

var errors = require("web-errors").errors;

var pay = require('../apis/pay');

module.exports = {
  notify: function (req, res, cb) {
    var data = {};
    var error = {};

    var xml = req.body;
    var xml2json = require('node-xml2json');

    var json = xml2json.toJSON(xml);

    pay.handle(function (error) {
        if (error === errors.SUCCESS) {
          res.json({
            return_code: 'SUCCESS',
            return_msg: errors.message
          });
        } else {
          res.json({
            return_code: 'FAIL',
            return_msg: errors.message
          });
        }
      }, true, json, config.notify
    );
  }
};
