
/**
 * Module dependencies.
 */

var express = require('express');
var cors = require('cors');

/**
 * App.
 */

express()
  .use(cors())
  .use(express.json())
  .post('/data', ok)
  .listen(3001)

/**
 * OK
 */

function ok(req, res){
  res.send(3 == req.body.length);
}
