const Res_AccountBalanceModel = require('../../model/Res_AccountBalanceModel');
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug('ClientResponse Payload Params : ', headers.xChannelId, result);
        if (headers.xChannelId == 'MB') {
            //console.log(result, 'resultttttttt')
            if (result.BACCY == '') {
                this.logger.debug('Client Request Conveverted to Account Balance Model', {});
                return { error: result.InfoMessage }
            }
            if (result.BACCY) {
                const res = new Res_AccountBalanceModel(result.accountNo, result.BACCY, "", "", result.BABAL, "", "", "", "");
                this.logger.debug('Client Request Conveverted to Account Balance Model', res);
                return res;
            }
            this.logger.debug('Client Request Conveverted to Account Balance Model', {});
            return {};
        }
        this.logger.debug('Client Request Conveverted to Account Balance Model', {});
        return {};
    }

}



module.exports = ClientResponse;