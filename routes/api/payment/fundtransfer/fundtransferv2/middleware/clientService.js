const config = require('config');
const Client = require('../../../../../../clients/client');
const ClientRequest = require('../middleware/transformation/request');
const ClientResponse = require('../middleware/transformation/response');

class ClientService {

    constructor(client_name, logger) {

        this.logger = logger;
        this.logger.debug('ClientService Object Requested with ', client_name);
        //console.log('Client Name : ', client_name)
        this.client = new Client(client_name, {}, this.logger);

    }

    async perform(apiRequest) {
        const countryCode = apiRequest.headers.xCountryCode.toUpperCase()
        this.logger.debug('ClientService perform method invoked with parameters : ', apiRequest);
        const clientRequest = new ClientRequest(this.logger);
        this.logger.debug('ClientReqeust Object Constructed', clientRequest);
        const payload = clientRequest.getPayloadRequest(apiRequest);
        //console.log('payload',payload)    
        this.logger.info({ payload: payload }, 'ClientRequest Generated Payload Request');
        if (countryCode == 'UK') {
            const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.fundTransfer.v2.method'), config.get('api.fundTransfer.v2.url'));            
            this.logger.info({ result: result }, 'Client Recieved Response from MISYS');
            if (result.error) {
                return result;
            } else {
                const clientResponse = new ClientResponse(this.logger);
                this.logger.debug('ClientResponse Object Constructed :', clientResponse)
                return clientResponse.getPayloadResponse(apiRequest.headers, result)
            }
        } if (countryCode == 'BAH') {
            //console.log("===============bah")
            const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.fundTransferBah.v2.method'), config.get('api.fundTransferBah.v2.url'));            
           //console.log(result)
            this.logger.info({ result: result }, 'Client Recieved Response from MISYS');
            if (result.error) {
                return result;
            } else {
                const clientResponse = new ClientResponse(this.logger);
                this.logger.debug('ClientResponse Object Constructed :', clientResponse)
                return clientResponse.getPayloadResponse(apiRequest.headers, result)
            }
        }if (countryCode == 'UAE') {
            //console.log("===============UAE")
            const result = await this.client.performRestRequest(apiRequest.headers, payload, config.get('api.fundTransferUAE.v2.method'), config.get('api.fundTransferUAE.v2.url'));            
           //console.log(result)
            this.logger.info({ result: result }, 'Client Recieved Response from MISYS');
            if (result.error) {
                return result;
            } else {
                const clientResponse = new ClientResponse(this.logger);
                this.logger.debug('ClientResponse Object Constructed :', clientResponse)
                return clientResponse.getPayloadResponse(apiRequest.headers, result)
            }
        }
        else {

            const result = {
                error: {
                   code:"unauthorized", message: apiRequest.headers.xCountryCode + ' country code not implemented'
                }
            }
            return result
        }
    }
}
module.exports = ClientService;