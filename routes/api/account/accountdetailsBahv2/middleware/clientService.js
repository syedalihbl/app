const config = require('config');
const Client = require('../../../../../clients/client');
const ClientResponse = require('../middleware/transformation/response');
const ClientRequest = require('../middleware/transformation/request');
class ClientService {

    constructor(client_name, logger) {
        this.logger = logger;

        this.logger.debug('Account Validation client_name : ', JSON.stringify(client_name));
        this.client = new Client(client_name, {}, this.logger);

    }

    async perform(apiRequest) {
        this.logger.debug('ClientService perform method invoked with parameters : ', apiRequest);
        const clientRequest = new ClientRequest(this.logger);
        this.logger.debug('ClientReqeust Object Constructed', clientRequest);
        const payload = clientRequest.getPayloadRequest(apiRequest);
        //console.log(payload, "=====pa")
        const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.accountDetailsBahv2.v1.method'), config.get('api.accountDetailsBahv2.v1.url'));
        //console.log(result, "=======result===")
        this.logger.info('Client Recieved Response', result);

        if (result.error) {
            return result;
        }
        const clientResponse = new ClientResponse(this.logger);
        this.logger.debug('ClientResponse Object Constructed :', clientResponse)
        result.accountNo = apiRequest.pathParams.accountNo;
        return clientResponse.getPayloadResponse(apiRequest.headers, result);
    }
}

module.exports = ClientService;
