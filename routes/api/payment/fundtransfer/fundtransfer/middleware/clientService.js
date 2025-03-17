const config = require('config');
const Client = require('../../../../../clients/client');
const ClientRequest = require('../middleware/transformation/request');
const ClientResponse = require('../middleware/transformation/response');

class ClientService {

    constructor(client_name, logger) {
      
        this.logger = logger;
        this.logger.debug('ClientService Object Requested with ',client_name);
        this.client = new Client(client_name, {}, this.logger);
    }

    async perform(apiRequest) {
        this.logger.debug('ClientService perform method invoked with parameters : ', apiRequest);
        const clientRequest = new ClientRequest(this.logger);
        this.logger.debug('ClientReqeust Object Constructed', clientRequest);
        const payload = clientRequest.getPayloadRequest(apiRequest);
        this.logger.info('ClientRequest Generated Payload Request : ', payload);

        if(apiRequest.headers.xCountryCode == 'BAH'){
            // const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.fundTransfer.v1.method'), config.get('api.fundTransfer.v1.url'));
        }else if (apiRequest.headers.xCountryCode == 'UK'){
            // const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.fundTransfer.v1.method'), config.get('api.fundTransfer.v1.url'));
        }
        
        const result = {mock:true};
        this.logger.info('Client Recieved Response', result);
        if (result.error) {
            return result;
        }
        const clientResponse = new ClientResponse(this.logger);
        this.logger.debug('ClientResponse Object Constructed :',clientResponse)
        return clientResponse.getPayloadResponse(apiRequest.headers, result);
    }
}

module.exports = ClientService;
