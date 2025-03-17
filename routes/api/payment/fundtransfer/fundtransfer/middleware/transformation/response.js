const Res_FundTransferModel = require('../../model/Res_FundTransferModel');
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {

        this.logger.debug('ClientResponse Payload Params : ', headers.xChannelId, result);
        if (headers.xCountryCode == 'BAH' && headers.xChannelId == 'CRPL') 
        {
            // if (result.OUTPUTPARM) {
            // const res = new Res_FundTransferModel(headers.xReqId, result.OUTPUTPARM.REPCODE, result.OUTPUTPARM.REPMESSAGE);            

            const res = new Res_FundTransferModel(headers.xReqId, '00', 'Success');
            this.logger.debug('Client Request Conveverted to Fund Transfer Model', res);
            return res;        

            // }
            // this.logger.debug('Client Request Conveverted to Fund Transfer Model', {});
            // return {};

        }
        if (headers.xCountryCode == 'UK' && headers.xChannelId == 'CRPL') {            

            // if (result.OUTPUTPARM) {
            // const res = new Res_FundTransferModel(headers.xReqId, result.OUTPUTPARM.REPCODE, result.OUTPUTPARM.REPMESSAGE);            

            const res = new Res_FundTransferModel(headers.xReqId, '00', 'Success');
            this.logger.debug('Client Request Conveverted to Fund Transfer Model', res);
            return res;            

            // }
            // this.logger.debug('Client Request Conveverted to Fund Transfer Model', {});
            // return {};               
            
        }
        this.logger.debug('Client Request Conveverted to Fund Transfer Model', {});
        return {};
    }
}
module.exports = ClientResponse;