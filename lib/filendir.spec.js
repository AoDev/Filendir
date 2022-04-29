const fs = require('fs')
const rm = require('rimraf')
const TMP_FOLDER = 'tmp_test'
const path = require('path')
const filendir = require('./filendir')
const mkdirp = require('mkdirp')

describe('Filendir', () => {
  afterEach(() => {
    rm.sync(TMP_FOLDER)
  })

  describe('shorthand methods', () => {
    it('should have a shorthand method for asynchronous write (wa)', () => {
      expect(filendir.wa).toEqual(filendir.writeFile)
      expect(filendir.wa).toEqual(filendir.writeFile)
      expect(filendir.wa).toEqual(filendir.writeFileAsync)
    })

    it('should have a shorthand method for synchronous write (ws)', () => {
      expect(filendir.ws).toEqual(filendir.writeFileSync)
    })
  })

  describe('synchronous write', () => {
    it('should write and create missing directories given a full path', () => {
      const data = 'hello world'
      const fullpath = path.join(TMP_FOLDER, 'nested_dir', 'test_file.txt')

      filendir.ws(fullpath, data)
      const read = fs.readFileSync(fullpath, 'utf8')

      expect(read).toEqual(data)
    })

    it('should throw errors like fs.writeFileSync', () => {
      function shouldThrow() {
        filendir.ws(null, 'hello world')
      }

      expect(shouldThrow).toThrow()
    })

    it('should allow to use the same options than original fs', () => {
      const fsWriteSpy = jest.spyOn(fs, 'writeFileSync')
      const data = 'hello world'
      const fullpath = path.join(TMP_FOLDER, 'nested_dir', 'test_file.txt')
      const options = 'utf8'

      filendir.ws(fullpath, data, options)

      expect(fsWriteSpy).toBeCalledWith(fullpath, data, options)
    })
  })

  describe('asynchronous write', () => {
    it('should write and create missing directories given a full path', function (done) {
      const data = 'hello world with callback'
      const fullpath = path.join(TMP_FOLDER, 'nested_dir', 'test_file.txt')
      const cb = function (err) {
        if (err) {
          console.log(err)
        }
        const read = fs.readFileSync(fullpath, 'utf8')
        expect(read).toEqual(data)
        done()
      }

      filendir.wa(fullpath, data, cb)
    })

    it('should throw errors like fs.writeFile', () => {
      function shouldThrow() {
        filendir.wa(null, 'hello world')
      }

      expect(shouldThrow).toThrow()
    })

    it('should allow to use the same options than original fs', function (done) {
      const fsWriteSpy = jest.spyOn(fs, 'writeFile')
      const data = 'hello world'
      const fullpath = path.join(TMP_FOLDER, 'nested_dir', 'test_file.txt')
      const options = 'utf8'
      const cb = function (err) {
        if (err) {
          console.log(err)
        }
        expect(fsWriteSpy).toBeCalledWith(fullpath, data, options, cb)
        done()
      }

      filendir.wa(fullpath, data, options, cb)
    })

    describe('with promises', () => {
      it('should return a promise and resolve on success', async () => {
        const fsWriteSpy = jest.spyOn(fs, 'writeFile')
        const data = 'hello world with promise'
        const fullpath = path.join(TMP_FOLDER, 'nested_dir', 'test_file.txt')
        const options = 'utf8'
        await filendir.wa(fullpath, data, options)
        const read = fs.readFileSync(fullpath, 'utf8')
        expect(read).toEqual(data)
        expect(fsWriteSpy).toBeCalledWith(fullpath, data, options, expect.anything())
        // we use expect.anything() because internally writeFile always uses a callback
      })

      it('should return a promise and reject on error', async () => {
        const data = 'hello world with promise'
        const options = 'utf8'
        try {
          await filendir.wa(null, data, options)
        } catch (err) {
          expect(err).toBeInstanceOf(Error)
        }
      })
    })
  })

  describe('mkdirp', () => {
    it('should be available', () => {
      expect(filendir.mkdirp).toEqual(mkdirp)
    })
  })
})
