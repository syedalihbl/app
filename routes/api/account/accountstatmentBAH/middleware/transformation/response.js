const APIError = require("../../../../../../common/model/apiError")
const APIResponse = require("../../../../../../common/model/apiResponse")

const Res_AccountStatmentModel = require('../../model/Res_AccountStatmentModel')

class ClientResponse {
    constructor(logger) {
        this.logger = logger
    }

    getPayloadResponse(headers, result) {
        //console.log("Resp:", result.OUTPUTPARM.RESCD)
        this.logger.debug('ClientResponse Payload Params : ', headers.xChannelId, result)

        if (result.OUTPUTPARM.RESCD === "0000000") {
            const res = new Res_AccountStatmentModel(result.OUTPUTPARM)
            this.logger.debug({ res: res }, 'Client Request Conveverted to ACCOUNT STATEMENT Model')
            return res

        } else {
            this.logger.debug('Client Request Conveverted to ACCOUNT STATEMENT Model', {})
            return new APIResponse("Fail", {}, new APIError(headers.xReqId, result.OUTPUTPARM.RESCD, result.OUTPUTPARM.RESMSG, 'TargetSystemError', result))
        }
    }
}

module.exports = ClientResponse