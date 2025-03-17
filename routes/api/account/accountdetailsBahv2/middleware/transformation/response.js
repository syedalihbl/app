const Res_AccountDetailsBahModel = require('../../model/Res_AccountDetailsBahModel');
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug('ClientResponse Payload Params : ', headers.xChannelId, result);

        const res = new Res_AccountDetailsBahModel(result.accountNo, result, result);
        this.logger.debug('Client Request Conveverted to Account Balance Model', res);
        return res;
    }

}



module.exports = ClientResponse;