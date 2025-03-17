const config = require("config");
const Client = require("../../../../../clients/client");
const ClientResponse = require("./transformation/response");
const Req_DirectDebitByAccountModel = require("../model/Req_DirectDebitByAccountModel");
const ClientRequest = require("./transformation/request");

class ClientService {
  constructor(client_name, logger) {
    this.logger = logger;
    this.logger.debug("Account Standing Service client_name : ", JSON.stringify(client_name));
    this.client = new Client(client_name, {}, this.logger);
  }

  async perform(apiRequest) {
    const clientRequest = new ClientRequest(this.logger)
    const payload = clientRequest.getPayloadRequest(apiRequest);
    // console.log(payload)
    this.logger.debug("ClientService perform method invoked with parameters : ", apiRequest);
    const result = await this.client.performRestRequest({}, payload, config.get("api.directDebitByAccount.v1.method"), config.get("api.directDebitByAccount.v1.url"));
    // this.logger.info("Client Recieved Response from MISYS", result);
    if (result.error) {
      return result;
    }
    const clientResponse = new ClientResponse(this.logger);
    this.logger.debug("ClientResponse Object Constructed :", clientResponse);
    result.accountNo = apiRequest.pathParams.accountNo;
    return clientResponse.getPayloadResponse(apiRequest.headers, result);
  }
}

module.exports = ClientService;
