/**
 * Module dependencies.
 */

var encode = require('base64-encode');
var Request = require('cors-xhr');
var jsonp = require('jsonp');
var JSON = require('json');
var once = require('once');

/**
 * Expose `send`
 */

exports = module.exports = Request
  ? json
  : base64;

/**
 * Expose `callback`
 */

exports.callback = 'callback';

/**
 * Expose `prefix`
 */

exports.prefix = 'data';

/**
 * Expose `json`.
 */

exports.json = json;

/**
 * Expose `base64`.
 */

exports.base64 = base64;

/**
 * Expose `type`
 */

exports.type = Request
  ? 'xhr'
  : 'jsonp';

/**
 * Send the given `obj` to `url` with `fn(err, req)`.
 *
 * @param {String} url
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

function json(url, obj, fn){
  var req = new Request;
  fn = once(fn);
  req.onerror = fn;
  req.onload =
  req.onreadystatechange = done;
  req.open('POST', url, true);
  req.send(JSON.stringify(obj));

  function done(){
    var readied = 4 == req.readyState || req.responseText;
    if (!readied) return;
    fn(null, req);
  }
}

/**
 * Send the given `obj` to `url` with `fn(err, req)`.
 *
 * @param {String} url
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

function base64(url, obj, fn){
  var prefix = exports.prefix;
  obj = encode(JSON.stringify(obj));
  obj = encodeURIComponent(obj);
  url += '?' + prefix + '=' + obj;
  jsonp(url, { param: exports.callback }, function(err, obj){
    if (err) return fn(err);
    fn(null, {
      url: url,
      body: obj
    });
  });
}
