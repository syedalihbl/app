const APIError = require('../../../../../../common/model/apiError')
const APIResponse = require('../../../../../../common/model/apiResponse')
const Res_AccountListBahModel = require('../../model/Res_AccountListBahModel')

class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug({ channelId: headers.xChannelId, result: result }, 'ClientResponse Payload Params')      
            if (headers.xCountryCode === 'BAH') {
                if (result.OutPutParm && result.OutPutParm.RepCode === "0000000") {
                    const res = new Res_AccountListBahModel(result.OutPutParm)
                    this.logger.debug({ res: res }, 'Client Request Conveverted to ACCOUNT LIST Model')
                    return res

                } else {
                    this.logger.debug('Client Request Conveverted to ACCOUNT LIST Model', {})
                    return new APIResponse("Fail", {}, new APIError(headers.xReqId, result.OutPutParm.RepCode, result.OutPutParm.RepMessage, 'TargetSystemError', result))
                }
            } else {
                this.logger.debug('Client Request Conveverted to ACCOUNT LIST Model', {})
                const devMsg = headers.xCountryCode + ' country code not implemented for ACCOUNT LIST'
                return new APIResponse("Fail", {}, new APIError(headers.xReqId, '', 'Not Implemented', 'JSONValidation', devMsg))
            }        
    }

}



module.exports = ClientResponse;