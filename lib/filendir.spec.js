var fs = require('fs')
var rm = require('rimraf')
var tmpdir = 'tmp_test'
var path = require('path')
var filendir = require('./filendir')
var expect = require('chai').expect

describe('Filendir', function () {
  afterEach(function () {
    rm.sync(tmpdir)
  })

  describe('synchronous write', function () {
    it('should write and create missing directories given a full path', function () {
      var read
      var content = 'hello world'
      var fullpath = path.join(tmpdir, 'nested_dir', 'test_file.txt')

      filendir.ws(fullpath, content)
      read = fs.readFileSync(fullpath, 'utf8')

      expect(read).to.equal(content)
    })
  })

  describe('asynchronous write', function () {
    it('should write and create missing directories given a full path', function (done) {
      var content = 'hello world with callback'
      var fullpath = path.join(tmpdir, 'nested_dir', 'test_file.txt')

      filendir.wa(fullpath, content, function (err) {
        if (err) {
          console.log(err)
          done()
          return
        }

        var read = fs.readFileSync(fullpath, 'utf8')
        expect(read).to.equal(content)
        done()
      })
    })
  })
})
