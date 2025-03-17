
const CommonHeaders = require('../../../../../common/model/header');
const APIError = require('../../../../../common/model/apiError');
const APIResponse = require('../../../../../common/model/apiResponse');
const ClientService = require('../middleware/clientService');
const APIRequest = require('../../../../../common/model/apiRequest');
const Req_AccountDetailsBahModel = require('../model/Req_AccountDetailsBahModel');
const config = require('config');

class accountDetailsBahService {

    constructor(headers, pathParams, logger) {
        this.logger = logger;

        this.logger.debug('Account Details Bahrain Service Object Initiated with Params : ', 'headers : ', headers, 'Params :', pathParams);
        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code']);
        this.accountDetailsBahModel = new Req_AccountDetailsBahModel(pathParams.account)
        this.logger.debug('Common Headers Object Constructed : ', this.commonHeader);

    }

    async perform() {
        try {
            const headerValidationResponse = this.commonHeader.validateSchema();
            this.logger.debug('Request Headers Validation Performed : ', headerValidationResponse);
            if (headerValidationResponse.error) {
                this.logger.debug('Request Headers Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details));
            }

            const apiRequest = new APIRequest(this.commonHeader, {}, {}, this.accountDetailsBahModel);
            this.logger.debug(this.commonHeader.xReqId, 'accountDetailsBah API Request : ', JSON.stringify(apiRequest));
            const paramValidationResponse = this.accountDetailsBahModel.validateSchema();
            this.logger.debug('Request Body Validation Performed : ', paramValidationResponse);

            if (paramValidationResponse.error) {
                this.logger.debug('Request Parameter Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details));
            }
            const clientService = new ClientService(config.get('api.accountDetailsBah.v1.api_type'), this.logger);

            this.logger.debug('ClientService object Constructed : ', clientService);
            const response = await clientService.perform(apiRequest);

            this.logger.info('ClientService Recieved Response : ', response);
            //console.log(response, 'responseeeeeeeeeeeeeee')
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
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'JSONValidation', response.error.developer_message));
                }
            }
            if (response.responseCode == '0000000') {
                delete response.developer_message;
                delete response.responseCode;
                delete response.responseDescription;
                return new APIResponse("Success", response, {});
            } else if (response.responseCode !== '0000000') {
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.responseCode, response.responseDescription, 'TargetSystemValidationError', response.developer_message));
            }
            else {
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'No Response Recieved From Backed System', 'TargetSystemError', response.developer_message));
            }

        } catch (error) {

            //console.log(error, 'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            this.logger.error('Error while executing Account Validation Service perform method : ', error);
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error));
        }
    }

}

module.exports = accountDetailsBahService;