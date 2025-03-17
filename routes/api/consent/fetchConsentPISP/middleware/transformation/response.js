const APIError = require('../../../../../../common/model/apiError')
const APIResponse = require('../../../../../../common/model/apiResponse')
const Res_fetchConsentPISPModel = require('../../model/Res_fetchConsentPISPModel')

class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug({ channelId: headers.xChannelId, result: result }, 'ClientResponse Payload Params')     
            if (headers.xCountryCode === 'BAH') {
                if (result.Data) {
                    const res = new Res_fetchConsentPISPModel(result)
                    this.logger.debug({ res: res }, 'Client Request Conveverted to fetchConsentPISP Model')
                    return res

                } else {
                    this.logger.debug('Client Request Conveverted to fetchConsentPISP Model', {})
                    return new APIResponse("Fail", {}, new APIError(headers.xReqId, {}, {}, 'TargetSystemError', result))
                }
            } else {
                this.logger.debug('Client Request Conveverted to fetchConsentPISP Model', {})
                const devMsg = headers.xCountryCode + ' country code not implemented for fetchConsentPISP'
                return new APIResponse("Fail", {}, new APIError(headers.xReqId, '', 'Not Implemented', 'JSONValidation', devMsg))
            }        
    }

}



module.exports = ClientResponse;