const APIError = require('../../../../../../common/model/apiError')
const APIResponse = require('../../../../../../common/model/apiResponse')
const Res_AccountListBahModel = require('../../model/Res_AccountListBahModel')

class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug({ channelId: headers.xChannelId, result: result }, 'ClientResponse Payload Params')
        if (headers.xChannelId == 'IB' || headers.xChannelId == 'MB') {
            if (headers.xCountryCode === 'BAH') {
                if (result.DReply && result.DReply.certinfos) {
                    const res = new Res_AccountListBahModel(result.DReply.certinfos)
                    this.logger.debug({ res: res }, 'Client Request Conveverted to ACCOUNT LIST Model')
                    return res

                } else {
                    this.logger.debug('Client Request Conveverted to ACCOUNT LIST Model', {})
                    return new APIResponse("Fail", {}, new APIError(headers.xReqId, '', '', 'TargetSystemError', result))
                }
            } else if (headers.xCountryCode === 'UK') {
                // MOCK Still
                if (result.DReply && result.DReply.certinfos) {
                    const res = new Res_AccountListBahModel(result.DReply.certinfos)
                    this.logger.debug({ res: res }, 'Client Request Conveverted to ACCOUNT LIST Model')
                    return res

                } else {
                    this.logger.debug('Client Request Conveverted to ACCOUNT LIST Model', {})
                    return new APIResponse("Fail", {}, new APIError(headers.xReqId, '', '', 'TargetSystemError', result))
                }

            } else {
                this.logger.debug('Client Request Conveverted to ACCOUNT LIST Model', {})
                const devMsg = headers.xCountryCode + ' country code not implemented for ACCOUNT LIST'
                return new APIResponse("Fail", {}, new APIError(headers.xReqId, '', 'Not Implemented', 'JSONValidation', devMsg))
            }
        } else {
            this.logger.debug('Client Request Conveverted to ACCOUNT LIST Model', {})
            const devMsg = headers.xChannelId + ' channel not implemented for ACCOUNT LIST'
            return new APIResponse("Fail", {}, new APIError(headers.xReqId, '', 'Not Implemented', 'JSONValidation', devMsg))
        }
    }

}



module.exports = ClientResponse;