const Res_FutureDatedPaymentModel = require("../../model/Res_FutureDatedPaymentModel");

class ClientResponse {

  constructor(logger) {
    this.logger = logger;
  }

  getPayloadResponse(headers, result) {

    this.logger.debug("ClientResponse Payload Params : ", headers.xChannelId, result);
    const res = new Res_FutureDatedPaymentModel(result);

    this.logger.debug("Client Request Converted to Future Dated Payment Model", res);

    return res;

  }
}

module.exports = ClientResponse;
