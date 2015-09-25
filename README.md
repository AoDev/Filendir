Filendir
========
Write a file given a full path. Create the directories if necessary.

-----------

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

API
----
Filendir exposes an asynchronous and a synchronous write method. It also exposes mkdirp if you need it.


### filendir.ws
### filendir.writeFileSync

**Synchronous write **

@return: true or false depending on success.

**Example**

```javascript
var path = require('path')
var filendir = require('filendir')
var filename = path.join('let','s', 'nest','some','directories','myfile.txt')
var content = 'Hello World'

if (filendir.ws(filename, content)) {
    console.log('File written!')
}
```


### filendir.wa
### filendir.writeFileAsync

**Asynchronous write **

**Example**

```javascript
var path = require('path')
var filendir = require('filendir')
var filename = path.join('let','s', 'nest','some','directories','myfile.txt')
var content = 'Hello World'

filendir.wa(filename, content, function (err) {
    if (!err) {
        console.log('File written!')
    }
})
```

###filendir.mkdirp
Would have been harder to do this without it.

See https://www.npmjs.org/package/mkdirp 
