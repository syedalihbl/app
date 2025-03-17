const config = require('config');
const Client = require('../../../../../clients/client');
const ClientRequest = require('../middleware/transformation/request');
const ClientResponse = require('../middleware/transformation/response');

class ClientService {

    constructor(client_name, logger) {
        this.logger = logger;
        this.logger.debug('ClientService Object Requested with ', client_name);
        this.client = new Client(client_name, {}, this.logger);
    }

    async perform(apiRequest) {
        this.logger.debug('ClientService perform method invoked with parameters : ', apiRequest);
        const clientRequest = new ClientRequest(this.logger);        
        this.logger.debug('ClientReqeust Object Constructed', clientRequest);

        // Get Config Property Values
        //console.log("=========================accountStatementBah")
        const requestURL = config.get('api.accountStatementBAH.v2.url')
        const requestMethod = config.get('api.accountStatementBAH.v2.method')
        const requestHeaders = apiRequest.headers
        const requestPayload = clientRequest.getPayloadRequest(apiRequest)
        //console.log(requestPayload,"=========================accountStatementBah")
        const result = await this.client.performRestRequest(requestHeaders, requestPayload, requestMethod, requestURL)
        this.logger.info('Client Recieved Response', result);
        if (result.error) {
            return result
        }        
        const clientResponse = new ClientResponse(this.logger);
        this.logger.debug('ClientResponse Object Constructed :', clientResponse)
        return clientResponse.getPayloadResponse(apiRequest.headers, result);
    }
}

module.exports = ClientService
