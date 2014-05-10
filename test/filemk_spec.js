var fs = require('fs')
var rm = require('rimraf')
var tmpdir = 'tmp_test'
var path = require('path')
var filendir = require('lib/index')

describe("Filendir Test Suite", function () {

  afterEach(function () {
    rm.sync(tmpdir)
  })

  it('should write (sync) a file on disk given a full path ', function () {

    var read
    var content = 'hello world'
    var fullpath = path.join(tmpdir, 'nested_dir', 'test_file.txt')

    filendir.ws(fullpath, content)
    read = fs.readFileSync(fullpath, 'utf8')

    expect(read).toBe(content)
  })

  it('should write (async) a file on disk given a full path', function (done) { 

    var content = 'hello world with callback'
    var fullpath = path.join(tmpdir, 'nested_dir', 'test_file.txt')

    filendir.wa(fullpath, content, function(err) {
 
      var read = fs.readFileSync(fullpath, 'utf8')
      expect(read).toBe(content)
      done()
    })
  })
})

