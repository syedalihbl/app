const config = require('config');
const Client = require('../../../../../clients/client');
const ClientResponse = require('../middleware/transformation/response');
const ClientRequest = require('../middleware/transformation/request');

class ClientService {

    constructor(client_name, logger) {
        this.logger = logger;

        this.logger.debug('Account Balance client_name : ', JSON.stringify(client_name));
        this.client = new Client(client_name, {}, this.logger);

    }

    async perform(apiRequest) {

        this.logger.debug('ClientService perform method invoked with parameters : ', apiRequest);
        if (apiRequest.headers.xCountryCode == 'UAE') {
            const result = await this.client.performRestRequest(apiRequest.headers, apiRequest.pathParams.accountNo, config.get('api.accountBalanceUAE.v1.method'), config.get('api.accountBalanceUAE.v1.url') + "?ACCOUNTNUMBER=" + apiRequest.pathParams.accountNo + "&APPROVEDLISTVALIDATION=N");
            //console.log(result)
            this.logger.info('Client Recieved Response', result);

            if (result.error) {
                return result;
            }
            const clientResponse = new ClientResponse(this.logger);
            result.accountNo = apiRequest.pathParams.accountNo;
            this.logger.debug('ClientResponse Object Constructed :', clientResponse)


            return clientResponse.getPayloadResponse(apiRequest.headers, result);
        }
        else if (apiRequest.headers.xCountryCode == 'BAH') {
            //console.log("=====BAH")
            const clientRequest = new ClientRequest(this.logger);
            this.logger.debug('ClientReqeust Object Constructed', clientRequest);
            const payload = clientRequest.getPayloadRequest(apiRequest);
            //console.log(payload, "=====pa")
            const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.accountBalanceBAHv2.v2.method'), config.get('api.accountBalanceBAHv2.v2.url'));
            this.logger.info('Client Recieved Response', result);

            if (result.error) {
                return result;
            }
            const clientResponse = new ClientResponse(this.logger);
            result.accountNo = apiRequest.pathParams.accountNo;
            this.logger.debug('ClientResponse Object Constructed :', clientResponse)


            return clientResponse.getPayloadResponse(apiRequest.headers, result);
        }
        else {
            return {
                error: { code: "Unauthorized", message: "You are not allowed to conduct this transction, Please contact with Adiminstrator for channel registration." }
            }
        }
    }
}

module.exports = ClientService;
