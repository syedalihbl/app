const Res_AccountDetailsUAEModel = require('../../model/Res_AccountDetailsUAEModel');
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug('ClientResponse Payload Params : ',headers.xChannelId, result);
        if (headers.xChannelId == 'MB') {
            if(result.AccountBankImd){
                const res = new Res_AccountDetailsUAEModel(result);              
                this.logger.debug('Client Request Converted to Res Account Details UAE  Model', res);
                return res;
                }
            this.logger.debug('Client Request Converted to  Account Details UAE Model', {});
            return {};
        }
        this.logger.debug('Client Request Converted to  Account Details UAE Model', {});
        return {};
    }

}



module.exports = ClientResponse;