const config = require("config");
const Client = require("../../../../../clients/client");
const ClientResponse = require("./transformation/response");

class ClientService {
  constructor(client_name, logger) {
    this.logger = logger;
    this.logger.debug("Get transaction  client_name : ", JSON.stringify(client_name));
    this.client = new Client(client_name, {}, this.logger);
  }

  async perform(apiRequest) {
    const date = new Date()
    const now = new Date(date)
    const todate = new Date(now.setDate(now.getDate() - 5 ))

    apiRequest.body.UNIREF = apiRequest.headers.xReqId
    apiRequest.body.CPRNO = apiRequest.pathParams.accountNo
    // apiRequest.body.TODATE = new Date(now.setTime(now.setTime() - 1))
    apiRequest.body.TODATE = todate.toISOString().split('T')[0].replaceAll('-', '');

    apiRequest.body.FROMDATE = await now.setDate(new Date().getDate() - 30)
    console.log(apiRequest.body.TODATE, '    apiRequest.body.FROMDATE', apiRequest.body.FROMDATE)
    apiRequest.body.FROMDATE = now.toISOString().split('T')[0].replaceAll('-', '');
    delete apiRequest.body.CIF
    this.logger.debug("ClientService perform method invoked with parameters : ", apiRequest);
    const result = await this.client.performRestRequest(apiRequest.headers, apiRequest.body, config.get("api.getTransactionByCPR.v1.method"), config.get("api.getTransactionByCPR.v1.url"));
    // this.logger.info("Client Recieved Response from MISYS", result);
    if (result.error) {
      return result;
    }
    const clientResponse = new ClientResponse(this.logger);
    this.logger.debug("ClientResponse Object Constructed :", clientResponse);
    result.cprNo = apiRequest.pathParams.cprNo;
    console.log('Prefer', apiRequest)
    return clientResponse.getPayloadResponse(apiRequest.headers, result);
  }
}

module.exports = ClientService;
