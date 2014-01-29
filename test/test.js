
describe('send-json', function(){
  var protocol = require('protocol');
  var send = require('send-json');
  var assert = require('assert');
  var json = require('json');

  it('should work', function(done){
    var url = protocol() + '//httpbin.org/post';
    send(url, [1, 2, 3], function(err, req){
      if (err) return done(new Error(err.message));
      var res = json.parse(req.responseText);
      assert(1 == res.json[0]);
      assert(2 == res.json[1]);
      assert(3 == res.json[2]);
      done();
    });
  })
});

