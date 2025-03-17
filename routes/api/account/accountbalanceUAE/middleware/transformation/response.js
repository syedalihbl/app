const Res_AccountBalanceModel = require('../../model/Res_AccountBalanceUAEModel');
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug('ClientResponse Payload Params : ',headers.xChannelId, result);
        if (headers.xChannelId == 'MB' || headers.xChannelId == 'CRPL') {                     
         
                const res = new Res_AccountBalanceModel(result.accountNo,result);
                this.logger.debug('Client Request Conveverted to Account Balance Model', res);
                return res;         
        }
        this.logger.debug('Client Request Conveverted to Account Balance Model', {});
        return {};
    }

}



module.exports = ClientResponse;