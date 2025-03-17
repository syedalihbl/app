const Res_GetBalancesModel = require("../../model/Res_GetBalancesModel");

class ClientResponse {

  constructor(logger) {
    this.logger = logger;
  }

  getPayloadResponse(headers, result) {

    this.logger.debug("ClientResponse Payload Params : ", headers.xChannelId, result);

    const res = new Res_GetBalancesModel(result.accountNo, result);

    this.logger.debug("Client Request Converted to Account Detail Inquiry Model", res);

    return res;

  }
}

module.exports = ClientResponse;
