const Res_AccountBalanceModel = require('../../model/Res_AccountBalanceUAEModel');
const Res_AccountBalanceBAHModel = require('../../model/Res_AccountBalanceBAHModel');
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug('ClientResponse Payload Params : ', headers.xChannelId, result);
        if (headers.xCountryCode == 'UAE') {

            const res = new Res_AccountBalanceModel(result.accountNo, result);
            this.logger.debug('Client Request Conveverted to Account Balance Model', res);
            return res;
        }
        else if (headers.xCountryCode == 'BAH') {
            //console.log(result, "=========BAH===================")
            const res = new Res_AccountBalanceBAHModel(result.accountNo, result, result);
            this.logger.debug('Client Request Conveverted to Account Balance Model', res);
            return res;
        }
        this.logger.debug('Client Request Conveverted to Account Balance Model', {});
        return {};
    }

}



module.exports = ClientResponse;