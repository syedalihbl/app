const Res_FutureDateModel = require("../../model/Res_FutureDateModel");

class ClientResponse {

  constructor(logger) {
    this.logger = logger;
  }

  getPayloadResponse(headers, result) {

    this.logger.debug("ClientResponse Payload Params : ", headers.xChannelId, result);

    const res = new Res_FutureDateModel(result);

    this.logger.debug("Client Request Converted to Future Date Service Model", res);

    return res;

  }
}

module.exports = ClientResponse;
