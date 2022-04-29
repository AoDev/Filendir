/**
 * Descriptions of methods have been copied from the original Node.js fs methods.
 */
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

exports.writeFileSync = exports.ws = writeFileSync
exports.writeFileAsync = exports.writeFile = exports.wa = writeFileAsync
exports.mkdirp = mkdirp

/**
 * Synchronously writes data to a file, replacing the file if it already exists, creates directory path if necessary.
 * @param {string | number | Buffer | URL} path A path to a file. If a URL is provided, it must use the file: protocol. URL support is experimental. If a file descriptor is provided, the underlying file will not be closed automatically.
 * @param {string | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array} data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 * @param {WriteFileOptions} options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag. If encoding is not supplied, the default of 'utf8' is used. If mode is not supplied, the default of 0o666 is used. If mode is a string, it is parsed as an octal integer. If flag is not supplied, the default of 'w' is used.
 */
function writeFileSync(filename, data, options) {
  if (typeof filename !== 'string') {
    throw new Error('path must be a string')
  }

  mkdirp.sync(path.dirname(filename))
  fs.writeFileSync(filename, data, options)
}

/**
 * Asynchronously writes data to a file, replacing the file if it already exists, creates directory path if necessary.
 * @param {string | number | Buffer | URL} path A path to a file. If a URL is provided, it must use the file: protocol. URL support is experimental. If a file descriptor is provided, the underlying file will not be closed automatically.
 * @param {string | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array} data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 * @param {WriteFileOptions} options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag. If encoding is not supplied, the default of 'utf8' is used. If mode is not supplied, the default of 0o666 is used. If mode is a string, it is parsed as an octal integer. If flag is not supplied, the default of 'w' is used.
 * @param {(err: Error) => void} cb optional callback.
 * @return {Promise<void>}
 */
function writeFileAsync(filename, data, options, cb) {
  if (typeof filename !== 'string') {
    throw new Error('path must be a string')
  }

  if (typeof options === 'function') {
    cb = options
  }

  return mkdirp(path.dirname(filename))
    .then(() => {
      return new Promise((resolve, reject) => {
        if (typeof cb === 'function') {
          fs.writeFile(filename, data, options, cb)
          resolve()
        } else {
          fs.writeFile(filename, data, options, (err) => {
            if (err) {
              reject(err)
            }
            resolve()
          })
        }
      })
    })
    .catch((err) => {
      if (typeof cb === 'function') {
        cb(err)
      }
      throw err
    })
}
