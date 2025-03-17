const config = require('config');
const { stdSerializers } = require('pino');


class ClientRequest {
    constructor(logger) {
        this.logger = logger;
        this.logger.debug('ClientRequest Object Initiated with Parameters : ', {});
    }
    getPayloadRequest(data) {
        console.log(data);

        this.logger.debug(
            'ClientRequest getPayloadRequest method invoked with parameters :',
            data
        )
        return {
            "UNIREF": data.headers.xReqId,
            "CPRNO": data.pathParams.AccountId

        }
    }
}

module.exports = ClientRequest;