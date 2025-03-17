const Res_AccountStatmentModel = require('../../model/Res_AccountStatmentModel');
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }
    
    getPayloadResponse(headers, result) {
        this.logger.debug('ClientResponse Payload Params : ',headers.xChannelId, result);
        if (headers.xChannelId == 'MB') {  
                const res = new Res_AccountStatmentModel(result.HEADER,result.HREPLY,result.DREPLY.CERTINFOS);              
                this.logger.debug('Client Request Conveverted to account statment  Model', res);
                return res;
        }
        this.logger.debug('Client Request Conveverted to account statment  Model', {});
        return {};
    }

}



module.exports = ClientResponse;