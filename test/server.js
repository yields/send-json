
/**
 * Module dependencies.
 */

var express = require('express');

/**
 * App.
 */

express()
  .use(json())
  .all('/data', ok);

/**
 * OK
 */

function ok(_, res){
  res.send(3 == req.body.length);
}

/**
 * json
 */

function json(req, res, next){
  try {
    req.body = JSON.parse(req.body);
    next();
  } catch (e) {
    next();
  }
}
