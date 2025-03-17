const config = require('config');
const Client = require('../../../../../clients/client');
const ClientResponse = require('../middleware/transformation/response');

class ClientService {

    constructor(client_name, logger) {
        this.logger = logger;       
       
        this.logger.debug('Account Balance client_name : ', JSON.stringify(client_name));
        this.client = new Client(client_name, {}, this.logger);
   
    }

    async perform(apiRequest) {        
      
        this.logger.debug('ClientService perform method invoked with parameters : ', apiRequest); 
        const result = await this.client.performRestRequest(apiRequest.headers, apiRequest.pathParams.accountNo,  config.get('api.accountBalance.v1.method'), config.get('api.accountBalance.v1.url')+"?BANEAN="+apiRequest.pathParams.accountNo);

        this.logger.info('Client Recieved Response', result);
     
        if (result.error) {            
            return result;
        }
        const clientResponse = new ClientResponse(this.logger);
        result.accountNo = apiRequest.pathParams.accountNo;       
        this.logger.debug('ClientResponse Object Constructed :',clientResponse)
        return clientResponse.getPayloadResponse(apiRequest.headers, result);
    }
}

module.exports = ClientService;
