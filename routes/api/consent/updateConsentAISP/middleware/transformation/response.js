const APIError = require("../../../../../../common/model/apiError")
const APIResponse = require("../../../../../../common/model/apiResponse")

const Res_updateConsentAISPModel = require('../../model/Res_updateConsentAISPModel')

class ClientResponse {
    constructor(logger) {
        this.logger = logger
    }

    getPayloadResponse(headers, result) {
        //console.log("Resp:", result.OUTPUTPARM.RESCD)
        this.logger.debug('ClientResponse Payload Params : ', headers.xChannelId, result)

        if (result.AccountDetailsUpdateSuccess) {
            const res = new Res_updateConsentAISPModel(result)
            this.logger.debug({ res: res }, 'Client Request Conveverted to updateConsentAISP Model')
            return res

        } else {
            this.logger.debug('Client Request Conveverted to updateConsentAISP Model', {})
            return new APIResponse("Fail", {}, new APIError(headers.xReqId, result, result, 'TargetSystemError', result))
        }
    }
}

module.exports = ClientResponse