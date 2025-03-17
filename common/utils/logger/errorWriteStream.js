const fs = require('fs')
const util = require('util')
const Writable = require('stream').Writable

const writeFile = util.promisify(fs.writeFile)

class ErrorWriteStream extends Writable {
  constructor (path) {
    super()
    this.path = path
  }

  _write (chunk, encoding, next) {
    // console.log('chunk', chunk.toString('utf8'));
    writeFile(this.path, chunk).
      then(() => next()).
      catch(error => next(error))
  }
}

module.exports = ErrorWriteStream
