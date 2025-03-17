const config = require('config')
const CommonHeaders = require('../../../../../common/model/header')

const APIError = require('../../../../../common/model/apiError')
const APIRequest = require('../../../../../common/model/apiRequest')
const APIResponse = require('../../../../../common/model/apiResponse')

const ClientService = require('../middleware/clientService')
const Req_fetchConsentAISPModel = require('../model/Req_fetchConsentAISPModel')

class fetchConsentAISPService {

    constructor(headers, body, logger) {
        this.logger = logger
        //console.log("Query:", body)

        this.logger.info({ headers: headers, params: body }, 'fetchConsentAISP Service Object Initiated with Headers and Params')

        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code'])
        this.logger.debug({ commonHeaders: this.commonHeader }, 'Common Headers Object Constructed')

        this.fetchConsentAISPModel = new Req_fetchConsentAISPModel(body.consentId)
        this.logger.debug({ dataModel: this.fetchConsentAISPModel }, 'Request Model Object Constructed')

    }

    async perform() {
        try {
            // Header Params Validation
            const headerValidationResponse = this.commonHeader.validateSchema();
            this.logger.debug({ headerValidator: headerValidationResponse }, 'Request Headers Validation Performed')
            if (headerValidationResponse.error) {
                this.logger.debug({ headerVaidatorMessage: headerValidationResponse.error.details[0].message, headerVaidatorName: headerValidationResponse.error.name, headerVaidatorDetail: headerValidationResponse.error.details }, 'Request Headers Validation Fails, Raised API Error with following Parameters');
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details[0].message))

            } else {
                // Body Params Validation
                const paramValidationResponse = this.fetchConsentAISPModel.validateSchema();
                this.logger.debug({ bodyValidator: paramValidationResponse }, 'Request Body Validation Performed');
                if (paramValidationResponse.error) {
                    this.logger.debug({ bodyValidatorMessage: paramValidationResponse.error.details[0].message, bodyValidatorName: paramValidationResponse.error.name, bodyValidatorDetail: paramValidationResponse.error.details }, 'Request Parameter Validation Fails, Raised API Error with following Parameters')
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details[0].message))

                } else {
                    const apiRequest = new APIRequest(this.commonHeader, this.fetchConsentAISPModel, {}, {})
                    this.logger.debug({ apiRequest: apiRequest }, 'fetchConsentAISP API Request')

                    const clientService = new ClientService(config.get('api.fetchConsentAISP.v1.api_type'), this.logger)
                    this.logger.debug({ clientService: clientService }, 'ClientService object constructed')

                    const response = await clientService.perform(apiRequest)
                    this.logger.info('ClientService Recieved Response : ', response);
                    // console.log('ClientService Recieved Response ----------------------- : ', response);
                    if (response.error) {
                        if (response.error.code == 'ECONNREFUSED') {
                            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'ConnectTimeout', JSON.stringify(response.error.developer_message)));
                        }
                        else if (response.error.code == 'ETIMEDOUT') {
                            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'ReadTimeout', JSON.stringify(response.error.developer_message)));
                        }
                        else if (response.error.code == 'ESOCKETTIMEDOUT') {
                            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'ReadTimeout', JSON.stringify(response.error.developer_message)));
                        }
                        else if (response.error.code == 'Unauthorized') {
                            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, '', JSON.stringify(response.error.developer_message.message)));
                        }
                        else {
                            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'TargetSystemValidationError', response.error.developer_message.message));
                        }
                    }
                    if (response.data) {
                        // delete response.developer_message;
                        // delete response.responseCode;
                        // delete response.responseMessage;
                        return new APIResponse("Success", response.data, {});
                    } else if (!response.data) {
                        return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.responseCode, response.responseMessage, 'TargetSystemValidationError', JSON.stringify(response.developer_message.message)));
                    }
                    else {
                        return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'No Response Recieved From Backed System', 'TargetSystemError', JSON.stringify(response.developer_message.message)));
                    }
                    // if (response.error) {
                    //     return response
                    // } else {
                    //     return new APIResponse("Success", response, {})
                    // }
                }
            }
        } catch (error) {
            this.logger.error({ errorStack: error.stack }, 'Error while executing ACCOUNT LIST Validation Service perform method');
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error));
        }
    }

}

module.exports = fetchConsentAISPService;