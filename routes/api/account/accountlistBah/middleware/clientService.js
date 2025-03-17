const config = require('config');

const APIUtil = require('../../../../../common/utils/apiUtil')
const APIError = require('../../../../../common/model/apiError')
const APIResponse = require('../../../../../common/model/apiResponse')

const Client = require('../../../../../clients/client')
const ClientResponse = require('../middleware/transformation/response')

class ClientService {

    constructor(clientName, logger) {
        this.logger = logger;

        this.logger.debug({ clientName: clientName }, 'ACCOUNT LIST clientName');
        this.client = new Client(clientName, {}, this.logger);
    }

    async perform(apiRequest) {
        this.logger.debug({ apiRequest: apiRequest }, 'ClientService perform method invoked with parameters')
        if (apiRequest.headers.xCountryCode.toUpperCase() === 'BAH') {

            const reqURL = config.get('api.accountListBah.v1.url') + apiRequest.pathParams.nationalityIdentityNo
            this.logger.info({ reqURL: reqURL }, 'Client Request URL');

            const result = await this.client.performRestRequest(apiRequest.headers, {}, config.get('api.accountListBah.v1.method'), reqURL)
            this.logger.info({ targetSystemResponse: result }, 'Client Recieved Response');

            if (result.error) {
                if (APIUtil.isConnectionTimeOut(result.error.developer_message)) {
                    return new APIResponse("Fail", {}, new APIError(apiRequest.headers.xReqId, '', 'Connection Timeout', 'TargetSystemError', result.error.developer_message))

                } else {
                    return result
                }
            } else {
                const clientResponse = new ClientResponse(this.logger);
                this.logger.debug({ clientResponse: clientResponse }, 'ClientResponse Object Constructed')
                return clientResponse.getPayloadResponse(apiRequest.headers, result);
            }

        } else if (apiRequest.headers.xCountryCode.toUpperCase() === 'UK') {
            // MOCK Still
            const result = {
                "DReply": {
                    "certinfos": [{
                        "AcType": "",
                        "AcBranch": "",
                        "AcCurrency": "",
                        "ShortName": "Mock Person",
                        "ExtAcNumber": "Mock Account Number",
                        "IBANNumber": "Mock IBAN Account Number",
                        "SI": "N",
                        "JointAc": "N",
                        "MinorAc": "N",
                        "AcClosing": "N",
                        "ODAllowed": "N",
                        "AcBlocked": "N",
                        "AcInactive": "N",
                        "ChequeBook": "N",
                        "DeceasedLiquid": "N"
                    }]
                }
            }

            const clientResponse = new ClientResponse(this.logger)
            this.logger.debug({ clientResponse: clientResponse }, 'ClientResponse Object Constructed')
            return clientResponse.getPayloadResponse(apiRequest.headers, result);

        } else {
            const devMsg = apiRequest.headers.xCountryCode + ' country code not implemented for ACCOUNT LIST'
            return new APIResponse("Fail", {}, new APIError(apiRequest.headers.xReqId, '', 'Not Implemented', 'JSONValidation', devMsg))
        }
    }
}

module.exports = ClientService;