const config = require("config");
const Client = require("../../../../../clients/client");
const ClientResponse = require("./transformation/response");

class ClientService {
  constructor(client_name, logger) {
    this.logger = logger;
    this.logger.debug("Account Balance client_name : ", JSON.stringify(client_name));
    this.client = new Client(client_name, {}, this.logger);
  }

  async perform(apiRequest) {
    this.logger.debug("ClientService perform method invoked with parameters : ", apiRequest);
    apiRequest.body.UNQREFERENCE = apiRequest.headers.xReqId
    apiRequest.body.ACCOUNTNO = apiRequest.pathParams.accountNo
    delete apiRequest.body.CIF
    const result = await this.client.performRestRequest(apiRequest.headers, apiRequest.body, config.get("api.getSuplimentaryAccountInfo.method"), config.get("api.getSuplimentaryAccountInfo.url"));
    // this.logger.info("Client Recieved Response from MISYS", result);
    if (result.error) {
      return result;
    }
    const clientResponse = new ClientResponse(this.logger);
    this.logger.debug("ClientResponse Object Constructed :", clientResponse);
    return clientResponse.getPayloadResponse(apiRequest.headers, result);
  }
}

module.exports = ClientService;
