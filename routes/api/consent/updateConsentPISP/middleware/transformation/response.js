const APIError = require("../../../../../../common/model/apiError")
const APIResponse = require("../../../../../../common/model/apiResponse")

const Res_updateConsentPISPModel = require('../../model/Res_updateConsentPISPModel')

class ClientResponse {
    constructor(logger) {
        this.logger = logger
    }

    getPayloadResponse(headers, result) {
        //console.log("Resp:", result.OUTPUTPARM.RESCD)
        this.logger.debug('ClientResponse Payload Params : ', headers.xChannelId, result)

        if (result.AccountDetailsUpdateSuccess) {
            const res = new Res_updateConsentPISPModel(result)
            this.logger.debug({ res: res }, 'Client Request Conveverted to updateConsentPISP Model')
            return res

        } else {
            this.logger.debug('Client Request Conveverted to updateConsentPISP Model', {})
            return new APIResponse("Fail", {}, new APIError(headers.xReqId, result, result, 'TargetSystemError', result))
        }
    }
}

module.exports = ClientResponse