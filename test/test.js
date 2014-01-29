
describe('send-json', function(){
  var protocol = require('protocol');
  var decode = require('base64-decode');
  var send = require('send-json');
  var assert = require('assert');
  var json = require('json');

  describe('#json', function(){
    it('should work', function(done){
      if ('xhr' != send.type) return done();
      var url = protocol() + '//httpbin.org/post';
      send.json(url, [1, 2, 3], function(err, req){
        if (err) return done(new Error(err.message));
        var res = json.parse(req.responseText);
        assert(1 == res.json[0]);
        assert(2 == res.json[1]);
        assert(3 == res.json[2]);
        done();
      });
    })
  })

  describe('#base64', function(){
    it('should work', function(done){
      if ('jsonp' != send.type) return done();
      var url = protocol() + '//www.reddit.com/r/pics.json';
      send.callback = 'jsonp';
      send.base64(url, [1, 2, 3], function(err, req){
        if (err) return done(new Error(err.message));
        var data = req.url.split('data=')[1];
        data = decodeURIComponent(data);
        data = json.parse(decode(data));
        assert(1 == data[0]);
        assert(2 == data[1]);
        assert(3 == data[2]);
        assert('Listing' == req.body.kind);
        done();
      });
    })
  })
});

