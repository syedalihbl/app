const config = require('config')
const Client = require('../../../../../../clients/client')
const ClientRequest = require('../middleware/transformation/request')
const ClientResponse = require('../middleware/transformation/response')

class ClientService {
    
    constructor(clientName, logger) {
        this.logger = logger;
        this.logger.debug({ clientName: clientName }, 'ClientService Object Requested with');
        this.client = new Client(clientName, {}, this.logger);
    }
    async perform(apiRequest) {

        const countryCode = apiRequest.headers.xCountryCode.toUpperCase()
        this.logger.debug({ apiRequest: apiRequest }, 'ClientService perform method invoked with parameters');
        const clientRequest = new ClientRequest(this.logger);
        this.logger.debug({ clientRequest: clientRequest }, 'ClientReqeust Object Constructed');    
        const payload = clientRequest.getPayloadRequest(apiRequest);        
        this.logger.info({ payload: apiRequest }, 'ClientRequest Generated Payload Request');        
      
      
        if (countryCode === 'BAH') {
            // const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.fundTransfer.v1.method'), config.get('api.fundTransfer.v1.url'));
            const result = {}
            const clientResponse = new ClientResponse(this.logger);
            this.logger.debug({ clientResponse: clientResponse }, 'ClientResponse Object Constructed')
            return clientResponse.getPayloadResponse(apiRequest.headers, result)
        } else if (countryCode === 'UK') {         
            const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.accStatement.v2.method'), config.get('api.accStatement.v2.url'));
            //console.log(result,"=========reusl")
            if(result.error){
                return  result;
            }
            const clientResponse = new ClientResponse(this.logger);
            this.logger.debug({ clientResponse: clientResponse }, 'ClientResponse Object Constructed')
            return clientResponse.getPayloadResponse(apiRequest.headers, result)
        } else if (countryCode === 'UAE') {         
            //console.log("==========UAE")
            const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.accStatementUAE.v2.method'), config.get('api.accStatementUAE.v2.url'));
            console.log(result)
            if(result.error){
                return  result;
            }
            const clientResponse = new ClientResponse(this.logger);
            this.logger.debug({ clientResponse: clientResponse }, 'ClientResponse Object Constructed')
            return clientResponse.getPayloadResponse(apiRequest.headers, result)
        }else {                        
            return result
        }
    }
}
module.exports = ClientService;