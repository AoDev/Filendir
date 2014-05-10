var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')

exports.writeFileSync = exports.ws = writeFileSync
exports.writeFileAsync = exports.wa = writeFileAsync
exports.mkdirp = mkdirp

function mkdir(dirname, cb) {
 
  if (cb) {
    mkdirp(dirname, cb)
  }
  else {
    try { 
      mkdirp.sync(dirname)
      return true
    }
    catch(e) { 
      console.error(e.message)
      return false
    }
  }
}


function writeFileSync(filename, content) {

  mkdir(path.dirname(filename))

  try {
    fs.writeFileSync(filename, content)
    return true
  }
  catch(e) {
    console.error(e.message)
    return false
  }
}


function writeFileAsync(filename, content, cb) {

  mkdir(path.dirname(filename), function (err) {
 
    if (err)
      console.error(err)
    else
      fs.writeFile(filename, content, cb)
  })
}
