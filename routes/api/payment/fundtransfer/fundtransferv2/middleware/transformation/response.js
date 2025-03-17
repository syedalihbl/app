const Res_FundTransferModel = require('../../model/Res_FundTransferModel');
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug('ClientResponse Payload Params : ', headers.xChannelId, result);
        if (headers.xCountryCode == 'UK') {           
            const res = new Res_FundTransferModel(result,"UK");
            this.logger.debug('Client Request Conveverted to Fund Transfer Model', res);
            return res;

        } else if (headers.xCountryCode == 'BAH' || headers.xCountryCode == 'UAE') {           
            const res = new Res_FundTransferModel(result,"BAH");
            this.logger.debug('Client Request Conveverted to Fund Transfer Model', res);
            return res;

        }else {
            this.logger.debug('Client Request Conveverted to Fund Transfer Model', {})
            return {}
        }
    }

}



module.exports = ClientResponse;