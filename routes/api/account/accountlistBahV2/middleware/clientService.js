const config = require('config');

const APIUtil = require('../../../../../common/utils/apiUtil')
const APIError = require('../../../../../common/model/apiError')
const APIResponse = require('../../../../../common/model/apiResponse')

const Client = require('../../../../../clients/client')
const ClientRequest = require('../middleware/transformation/request')
const ClientResponse = require('../middleware/transformation/response')

class ClientService {

    constructor(clientName, logger) {
        this.logger = logger;

        this.logger.debug({ clientName: clientName }, 'ACCOUNT LIST clientName');
        this.client = new Client(clientName, {}, this.logger);
    }

    async perform(apiRequest) {
        this.logger.debug({ apiRequest: apiRequest }, 'ClientService perform method invoked with parameters')

        const clientRequest = new ClientRequest(this.logger)

        // Get Config Property Values
        const inputUSER = config.get('api.accountListByCPR.v2.userID')
        const requestURL = config.get('api.accountListByCPR.v2.url')
        const requestMethod = config.get('api.accountListByCPR.v2.method')
        const requestHeaders = apiRequest.headers
        const requestPayload = clientRequest.getPayloadRequest(apiRequest, inputUSER)

        const result = await this.client.performRestRequest(requestHeaders, requestPayload, requestMethod, requestURL)
        //console.log(result, "===================")
        this.logger.info('Client Recieved Response', result);

        if (result.error) {
            return result;
        }
        const clientResponse = new ClientResponse(this.logger)
        this.logger.debug({ clientResponse: clientResponse }, 'ClientResponse Object Constructed')
        var returnresult = clientResponse.getPayloadResponse(apiRequest.headers, result);

        //console.log(returnresult, "===================")
        return returnresult


    }
}

module.exports = ClientService