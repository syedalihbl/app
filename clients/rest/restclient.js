const cRest = require('request-promise')

class RestClient {
    constructor(timeout, logger) {
        this.logger = logger;
        this.logger.debug('RestClient Object Initiated with Parameters : ', timeout)
        this.cRest = cRest
        this.timeout = timeout
    }

    async execute(url, headers, method, params) {
        this.logger.debug('RestClient execute method parameters : ', url, headers, method, params)
        const options = {
            url: url,
            headers: headers,
            method: method,
            json: true,
            body: params,
            timeout: this.timeout
        }
        this.logger.debug('Rest Client options to executed : ', options)
        return this.cRest(options)
    }

    async executeFormData(url, headers, method, params) {
        this.logger.debug('RestClient execute method parameters : ', url, headers, method, params)
        const options = {
            url: url,
            headers: headers,
            method: method,
            json: true,
            form: params,
            timeout: this.timeout
        }
        this.logger.debug('Rest Client options to executed : ', options)
        return this.cRest(options)
    }
}

module.exports = RestClient
