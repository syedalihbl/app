const config = require('config')
const APIError = require('../../../../../../common/model/apiError')
const APIRequest = require('../../../../../../common/model/apiRequest')
const APIResponse = require('../../../../../../common/model/apiResponse')
const CommonHeaders = require('../../../../../../common/model/header')
const ClientService = require('../middleware/clientService')
const Req_AccountStatement = require('../model/Req_AccountStatementModel')
const Req_AccountStatementUAE = require('../model/Req_AccountStatementUAEModel')
const { head } = require('request-promise')

class AccountStatement {
    constructor(headers, body, logger) {
        this.logger = logger;
        this.logger.info({ headers: headers, params: body }, 'Account statement Service Object Initiated with Headers and Params')
        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code'])
        this.logger.debug({ commonHeaders: this.commonHeader }, 'Common Headers Object Constructed')
        if(headers['x-country-code'] == 'UK'){
            this.accountStatmentModel = new Req_AccountStatement(body);
        }
        else if(headers['x-country-code'] == 'UAE'){
            this.accountStatmentModel = new Req_AccountStatementUAE(body);
        }
        
        this.logger.debug({ dataModel: this.accountStatmentModel }, 'Account statement Model Object Constructed');
    }
    async perform() {

        try {
            if(this.commonHeader.xCountryCode !== 'UAE' && this.commonHeader.xCountryCode !== 'UK'){
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, 'Unthorized', "You are not allowed to conduct this transction, Please contact with Adiminstrator",'',{}));
     
            }
            const headerValidationResponse = this.commonHeader.validateSchema();
            this.logger.debug('Request Headers Validation Performed : ', headerValidationResponse);
            if (headerValidationResponse.error) {
                this.logger.debug('Request Headers Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details));
            }
            const bodyValidationResponse = this.accountStatmentModel.validateSchema();
            this.logger.debug('Request Body Validation Performed : ', bodyValidationResponse);
            if (bodyValidationResponse.error) {
                this.logger.debug('Request Body Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', bodyValidationResponse.error.details[0].message, bodyValidationResponse.error.name, bodyValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', bodyValidationResponse.error.details[0].message, bodyValidationResponse.error.name, bodyValidationResponse.error.details));
            }
            const apiRequest = new APIRequest(this.commonHeader, this.accountStatmentModel, {}, {});
            this.logger.debug({ apiRequest: apiRequest }, 'API Request Object Constructed');
            const clientService = new ClientService(config.get('api.accStatement.v2.api_type'), this.logger);
            this.logger.debug({ clientService: clientService }, 'ClientService object Constructed');
            const response = await clientService.perform(apiRequest);
            //console.log(response,"============response")
            if (response.error) {
                if (response.error.code == 'ECONNREFUSED') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'ConnectTimeout', response.error.developer_message));
                } else if (response.error.code == 'ETIMEDOUT') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'ReadTimeout', response.error.developer_message));
                }
                else if (response.error.code == 'ESOCKETTIMEDOUT') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'ReadTimeout', response.error.developer_message));
                } else if (response.error.code == '404') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'JSONValidation', response.error.developer_message));
                }
                else {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'TargetSystemError', response.error.developer_message));
                }
            }
            //console.log(apiRequest.headers.xCountryCode)
            if (response.CS !== 'null' && apiRequest.headers.xCountryCode == 'UK') {
                return new APIResponse("Success", response, {});
            }else if (response.responseCode == '0000000' && apiRequest.headers.xCountryCode == 'UAE') {
                delete response.responseCode;
                delete response.responseDescription ;
                return new APIResponse("Success", response, {});
            } else if (response.responseCode !== '0000000') {
                    //console.log(response,"===================")
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.responseCode, response.responseDescription, 'TargetSystemValidationError', response.backendResponse));
            }
            else {
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'No Response Recieved From Backed System', 'TargetSystemError', response));
            }

        } catch (error) {
            this.logger.error({ errorStack: error.stack }, 'Error while executing Fund Transfer Service perform method');
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error.stack));
        }
    }

}
module.exports = AccountStatement;