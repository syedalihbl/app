
const Res_AccountBalanceCPRModel = require('../../model/Res_AccountBalanceCPRModel');
const APIError = require('../../../../../../common/model/apiError')
const APIResponse = require('../../../../../../common/model/apiResponse')
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {

        this.logger.debug("ClientResponse Payload Params : ", headers.xChannelId, result);
        if (result.RESPONSE && result.RESPONSE.RESPCODE === "0000") {
          const res = new Res_AccountBalanceCPRModel(result)
          this.logger.debug({ res: res }, 'Client Request Conveverted to standing order Model')
          return res
    
      } else {
          this.logger.debug('Client Request Conveverted to standing order Model', {})
          return new APIResponse("Fail", {}, new APIError(headers.xReqId, result.RESPONSE.RESPCODE, result.RESPONSE.RESPMESSAGE, 'TargetSystemError', result))
      }
    
      }

}



module.exports = ClientResponse;