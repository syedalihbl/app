const APIError = require("../../../../../../../common/model/apiError")
const APIResponse = require("../../../../../../../common/model/apiResponse")

const Res_FundTransferModel = require('../../model/Res_FundTransferModel')

class ClientResponse {
    constructor(logger) {
        this.logger = logger
    }

    getPayloadResponse(headers, result) {
        this.logger.debug('ClientResponse Payload Params : ', headers.xChannelId, result)

        if (result.OUTPUTPARM.REPCODE === "0000000") {
            const res = new Res_FundTransferModel(result.OUTPUTPARM)
            this.logger.debug({ res: res }, 'Client Request Conveverted to FUND TRANSFER Model')
            return res

        } else {
            this.logger.debug('Client Request Conveverted to FUND TRANSFER Model', {})
            return new APIResponse("Fail", {}, new APIError(headers.xReqId, result.OUTPUTPARM.REPCODE, result.OUTPUTPARM.REPMESSAGE, 'TargetSystemError', result))
        }
    }
}

module.exports = ClientResponse