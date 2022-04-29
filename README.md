# Filendir

Write a file given a full path. Create the missing directories if necessary.

---

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://app.travis-ci.com/AoDev/Filendir.svg?branch=master)](https://app.travis-ci.com/AoDev/Filendir)
![Node.js >= 10](https://img.shields.io/badge/nodejs-%3E%3D%2010-brightgreen)

## API

Filendir exposes an asynchronous and a synchronous write method.

It also exposes `mkdirp` to create directories only, if you need it.

## filendir versions node support

- 1.x for nodejs **v4** to **v9**
- 2.x for nodejs **v10** to **now**

### Synchronous write

- **filendir.ws** (shorthand)
- **filendir.writeFileSync**

Apart from creating the missing directories,
it has the same behaviour and interface than node `fs.writeFileSync`.

```js
// signature
filendir.writeFileSync(filename, data[, options])
```

[See fs.writeFileSync in Node.js site](https://nodejs.org/api/fs.html#fs_fs_writefilesync_filename_data_options)

**Example**

```js
var path = require('path')
var filendir = require('filendir')
var filename = path.join('let', 's', 'nest', 'some', 'directories', 'myfile.txt')
var content = 'Hello World'

filendir.ws(filename, content)
```

### Asynchronous write

- **filendir.wa** (shorthand)
- **filendir.writeFile**

Apart from creating the missing directories,
it has the same behaviour and interface than node `fs.writeFile`.

**Extra from fs.writefile**: you can use promises

```js
// callback use
filendir.writeFile(filename, data[, options], callback)
```

```js
// with promise
await filendir.writeFile(filename, data[, options])
```

[See fs.writeFile in Node.js site](https://nodejs.org/api/fs.html#fs_fs_writefile_filename_data_options_callback)

**Example**

```js
var path = require('path')
var filendir = require('filendir')
var filename = path.join('let', 's', 'nest', 'some', 'directories', 'myfile.txt')
var content = 'Hello World'

filendir.wa(filename, content, function (err) {
  if (!err) {
    console.log('File written!')
  }
})
```

### filendir.mkdirp

Credits to Substack. Would have been harder to do this without it.

See https://www.npmjs.org/package/mkdirp
