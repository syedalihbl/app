class APIError {
  constructor (reqId, code, message, type, developer_message) {
    this.reqId = reqId || '';
    this.message = message || '';
    this.code = code || '';
    this.type = type || '';
    this.developer_message = developer_message || '';
  }
}

module.exports = APIError
