const Req_updateConsentAISPModel = require('../model/Req_updateConsentAISPModel');
const CommonHeaders = require('../../../../../common/model/header');
const APIError = require('../../../../../common/model/apiError');
const APIResponse = require('../../../../../common/model/apiResponse');
const ClientService = require('../middleware/clientService');
const APIRequest = require('../../../../../common/model/apiRequest');
const config = require('config');

class updateConsentAISPService {

    constructor(headers, body, logger) {
        this.logger = logger;
        this.logger.debug('account statment  Service Object Initiated with Params : ', 'headers : ', headers, 'body :', body);
        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code']);
        this.logger.debug('Common Headers Object Constructed : ', this.commonHeader);
        this.updateConsentAISPModel = new Req_updateConsentAISPModel(body);
        this.logger.debug('account statment  Model Object Constructed : ', this.updateConsentAISPModel);
    }

    async perform() {
        try {
            const headerValidationResponse = this.commonHeader.validateSchema();
            this.logger.debug('Request Headers Validation Performed : ', headerValidationResponse);
            if (headerValidationResponse.error) {
                this.logger.debug('Request Headers Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, JSON.stringify(headerValidationResponse.error.details)));
            }
            const bodyValidationResponse = this.updateConsentAISPModel.validateSchema();
            this.logger.debug('Request Body Validation Performed : ', bodyValidationResponse);
            console.log('Request Body Validation Performed : ', bodyValidationResponse);
            if (bodyValidationResponse.error) {
                this.logger.debug('Request Body Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', bodyValidationResponse.error.details[0].message, bodyValidationResponse.error.name, bodyValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', bodyValidationResponse.error.details[0].message, bodyValidationResponse.error.name, JSON.stringify(bodyValidationResponse.error.details)));
            }
            const apiRequest = new APIRequest(this.commonHeader, this.updateConsentAISPModel, {}, {});
            this.logger.debug('API Request Object Constructed : ', apiRequest);
            const clientService = new ClientService(config.get('api.updateConsentAISP.v1.api_type'), this.logger);
            this.logger.debug('ClientService object Constructed : ', clientService);

            const response = await clientService.perform(apiRequest)
            this.logger.info('ClientService Recieved Response : ', response);
            console.log('ClientService Recieved Response : ', response);
            if (response.error) {
                if (response.error.code == 'ECONNREFUSED') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'ConnectTimeout', response.error.developer_message));
                }
                else if (response.error.code == 'ETIMEDOUT') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'ReadTimeout', response.error.developer_message));
                }
                else if (response.error.code == 'ESOCKETTIMEDOUT') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'ReadTimeout', response.error.developer_message));
                }
                else if (response.error.code == 'Unauthorized') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, '', response.error.developer_message));
                }
                else {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'TargetSystemValidationError', response.error.developer_message.error));
                }
            }          
                if (response.accountDetailsUpdateSuccess == true) {
                    // delete response.developer_message;
                    // delete response.responseCode;
                    // delete response.responseDescription;
                    return new APIResponse("Success", response, {});
                } else if (response.accountDetailsUpdateSuccess == false) {
                    return new APIResponse("Fail", response, {});
                } else if (!response.accountDetailsUpdateSuccess) {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.responseCode, response.responseDescription, 'TargetSystemValidationError', response.developer_message.error));
                }
                else {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'No Response Recieved From Backed System', 'TargetSystemError', response.developer_message));
                }
            // if (response.error) {
            //     return response
            // } else {
            //     return new APIResponse("Success", response, {})
            // }
        } catch (error) {
            this.logger.error('Error while executing account statment  Service perform method : ', error);
            console.log('Error while executing account statment  Service perform method : ', error);
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error));
        }
    }

}

module.exports = updateConsentAISPService;