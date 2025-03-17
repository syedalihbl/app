const config = require('config')
const CommonHeaders = require('../../../../../common/model/header')

const APIError = require('../../../../../common/model/apiError')
const APIRequest = require('../../../../../common/model/apiRequest')
const APIResponse = require('../../../../../common/model/apiResponse')

const ClientService = require('../middleware/clientService')
const Req_AccountListBahModel = require('../model/Req_AccountListBahModel')

class accountListBahService {

    constructor(headers, pathParams, logger) {
        this.logger = logger;

        this.logger.info({ headers: headers, params: pathParams }, 'ACCOUNT LIST Service Object Initiated with Headers and Params')

        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code'])
        this.logger.debug({ commonHeaders: this.commonHeader }, 'Common Headers Object Constructed')

        this.accountListBahModel = new Req_AccountListBahModel(pathParams.nationalityIdentityNo)
        this.logger.debug({ dataModel: this.accountListBahModel }, 'Request Model Object Constructed')

    }

    async perform() {
        try {
            // Header Params Validation
            const headerValidationResponse = this.commonHeader.validateSchema();
            this.logger.debug({ headerValidator: headerValidationResponse }, 'Request Headers Validation Performed')
            if (headerValidationResponse.error) {
                this.logger.debug({ headerVaidatorMeesage: headerValidationResponse.error.details[0].message, headerVaidatorName: headerValidationResponse.error.name, headerVaidatorDetail: headerValidationResponse.error.details }, 'Request Headers Validation Fails, Raised API Error with following Parameters');
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details))

            } else {
                // Body Params Validation
                const paramValidationResponse = this.accountListBahModel.validateSchema();
                this.logger.debug({ bodyValidator: paramValidationResponse }, 'Request Body Validation Performed');
                if (paramValidationResponse.error) {
                    this.logger.debug({ bodyValidatorMessage: paramValidationResponse.error.details[0].message, bodyValidatorName: paramValidationResponse.error.name, bodyValidatorDetail: paramValidationResponse.error.details }, 'Request Parameter Validation Fails, Raised API Error with following Parameters')
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details))

                } else {
                    const apiRequest = new APIRequest(this.commonHeader, {}, {}, this.accountListBahModel)
                    this.logger.debug({ apiRequest: apiRequest }, 'ACCOUNT LIST API Request')

                    const clientService = new ClientService(config.get('api.accountListBah.v1.api_type'), this.logger)
                    this.logger.debug({ clientService: clientService }, 'ClientService object constructed')

                    const response = await clientService.perform(apiRequest)
                    if (response.error) {
                        return response
                    } else {
                        return new APIResponse("Success", response, {})
                    }
                }
            }
        } catch (error) {
            this.logger.error({ errorStack: error.stack }, 'Error while executing ACCOUNT LIST Validation Service perform method');
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error));
        }
    }

}

module.exports = accountListBahService;