const config = require("config");
const Client = require("../../../../../clients/client");
const ClientResponse = require("./transformation/response");

class ClientService {
  constructor(client_name, logger) {
    this.logger = logger;
    this.logger.debug("Get Debit by CIF client_name : ", JSON.stringify(client_name));
    this.client = new Client(client_name, {}, this.logger);
  }

  async perform(apiRequest) {

    apiRequest.body.UNIREF = apiRequest.headers.xReqId
    apiRequest.body.BASICNO = apiRequest.pathParams.cifNo
    delete apiRequest.body.CIF
    this.logger.debug("ClientService perform method invoked with parameters : ", apiRequest);
    const result = await this.client.performRestRequest(apiRequest.headers, apiRequest.body, config.get("api.directDebitByCIF.v1.method"), config.get("api.directDebitByCIF.v1.url"));
    this.logger.info("Client Recieved Response from MISYS", result);
    if (result.error) {
      return result;
    }
    const clientResponse = new ClientResponse(this.logger);
    this.logger.debug("ClientResponse Object Constructed :", clientResponse);
    result.accountNo = apiRequest.pathParams.accountNo;
    console.log('Prefer', apiRequest)
    return clientResponse.getPayloadResponse(apiRequest.headers, result);
  }
}

module.exports = ClientService;
