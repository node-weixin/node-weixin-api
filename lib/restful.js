var request = require('request');
var fs = require("fs");
var auth = require("./auth");
var xml2json = require('xml2json');

module.exports = {
  /**
   * Marshalling params
   *
   * @param params
   * @returns {string}
   */
  toParam: function (params, withoutAuth) {
    params = params || {};
    var keys = [];
    for (var k in params) {
      keys.push(k + '=' + encodeURIComponent(params[k]));
    }
    if (!withoutAuth) {
      keys.push('access_token=' + encodeURIComponent(auth.accessToken));
    }
    return keys.join('&');
  },

  /**
   * For normal requests
   * @param url
   * @param data
   * @param cb
   */
  request: function (url, data, cb) {
    request.post({url: url, json: true, form: data}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        cb(false, body);
      } else {
        cb(true, {errorMessage: body});
      }
    });
  },

  /**
   * For json data posting
   *
   * @param url
   * @param data
   * @param cb
   */
  json: function (url, data, cb) {
    request.post({url: url, body: data, json: true}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        cb(false, body);
      } else {
        cb(true, {errorMessage: body});
      }
    });
  },

  /**
   * For xml data posting
   *
   * @param url
   * @param data
   * @param cb
   */
  xml: function (url, xml, cb) {
    request.post({
      url: url, body: xml, headers: {'Content-Type': 'text/xml'}
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var json = null;
        try {
          json = JSON.parse(xml2json.toJson(body));
          cb(false, json.xml);
        } catch (e) {
          console.log(e);
          throw e;
        }
      } else {
        cb(true, {errorMessage: body});
      }
    });
  },

  /**
   * For xml data posting with ssl
   *
   * @param url
   * @param data
   * @param cb
   */
  xmlssl: function (url, xml, cb, ssl) {
    request.post({
      url: url, body: xml, headers: {'Content-Type': 'text/xml'},
    agentOptions: {
      cert: ssl.cert,
      key: ssl.key
    }
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var json = null;
        try {
          json = JSON.parse(xml2json.toJson(body));
          cb(false, json.xml);
        } catch (e) {
          console.log(e);
          throw e;
        }
      } else {
        cb(true, {errorMessage: body});
      }
    });
  },

  /**
   * For file uploading
   *
   * @param url
   * @param file
   * @param cb
   */
  file: function (url, file, cb) {
    fs.stat(file, function (err, stat) {
      if (err) {
        return cb(true, {errorMessage: 'File not exist'});
      }
      var media = fs.createReadStream(file);
      request.post({
        url: url,
        json: true,
        formData: {media: media, nonce: ''}
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          cb(false, body);
        } else {
          cb(true, {errorMessage: body});
        }
      });
    });
  },

  /**
   * For file downloading
   *
   * @param url
   * @param data
   * @param file
   * @param cb
   */
  download: function (url, data, file, cb) {
    request.get({url: url, form: data}).pipe(fs.createWriteStream(file).on('finish', cb));
  },
};
