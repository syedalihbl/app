const APIError = require('../../../../../../common/model/apiError')
const APIResponse = require('../../../../../../common/model/apiResponse')
const Res_fetchConsentAISPModel = require('../../model/Res_fetchConsentAISPModel')

class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug({ channelId: headers.xChannelId, result: result }, 'ClientResponse Payload Params')     
            if (headers.xCountryCode === 'BAH') {
                if (result.Data) {
                    const res = new Res_fetchConsentAISPModel(result)
                    this.logger.debug({ res: res }, 'Client Request Conveverted to fetchConsentAISP Model')
                    return res

                } else {
                    this.logger.debug('Client Request Conveverted to fetchConsentAISP Model', {})
                    return new APIResponse("Fail", {}, new APIError(headers.xReqId, {}, {}, 'TargetSystemError', result))
                }
            } else {
                this.logger.debug('Client Request Conveverted to fetchConsentAISP Model', {})
                const devMsg = headers.xCountryCode + ' country code not implemented for fetchConsentAISP'
                return new APIResponse("Fail", {}, new APIError(headers.xReqId, '', 'Not Implemented', 'JSONValidation', devMsg))
            }        
    }

}



module.exports = ClientResponse;