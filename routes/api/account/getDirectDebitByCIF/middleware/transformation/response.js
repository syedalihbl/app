const Res_GetDirectDebitByCIFModel = require("../../model/Res_GetDirectDebitByCIFModel");

class ClientResponse {

  constructor(logger) {
    this.logger = logger;
  }

  getPayloadResponse(headers, result) {

    this.logger.debug("ClientResponse Payload Params : ", headers.xChannelId, result);

    const res = new Res_GetDirectDebitByCIFModel(result.accountNo, result);

    this.logger.debug("Client Request Converted to Account Detail Inquiry Model", res);

    return res;

  }
}

module.exports = ClientResponse;
