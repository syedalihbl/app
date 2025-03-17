const config = require('config')

const APIError = require('../../../../../../common/model/apiError')
const CommonHeaders = require('../../../../../../common/model/header')
const APIRequest = require('../../../../../../common/model/apiRequest')
const APIResponse = require('../../../../../../common/model/apiResponse')

const ClientService = require('../middleware/clientService')
const Req_FundTransferModel = require('../model/Req_FundTransferModel')

class fundTransferService {

    constructor(headers, body, logger) {
        this.logger = logger;
        this.logger.info('Fund Transfer Service Object Initiated with Params : ', 'headers : ', headers, 'body :', body);
        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code']);
        this.logger.debug('Common Headers Object Constructed : ', this.commonHeader);
        this.fundTransferModel = new Req_FundTransferModel(body);
        this.logger.debug('Fund Transfer Model Object Constructed : ', this.fundTransferModel);
    }

    async perform() {
        try {
            const headerValidationResponse = this.commonHeader.validateSchema();
            this.logger.debug('Request Headers Validation Performed : ', headerValidationResponse);
            if (headerValidationResponse.error) {
                this.logger.debug('Request Headers Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details[0].message));
            }
            const bodyValidationResponse = this.fundTransferModel.validateSchema();
            this.logger.debug('Request Body Validation Performed : ', bodyValidationResponse);
            if (bodyValidationResponse.error) {
                this.logger.debug('Request Body Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', bodyValidationResponse.error.details[0].message, bodyValidationResponse.error.name, bodyValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', bodyValidationResponse.error.details[0].message, bodyValidationResponse.error.name, bodyValidationResponse.error.details[0].message));
            }
            const apiRequest = new APIRequest(this.commonHeader, this.fundTransferModel, {}, {});
            this.logger.debug('API Request Object Constructed : ', apiRequest);
            const clientService = new ClientService(config.get('api.fundTransferH2H.v2.api_type'), this.logger);
            this.logger.debug('ClientService object Constructed : ', clientService);
            const response = await clientService.perform(apiRequest)
            this.logger.info('ClientService Recieved Response : ', response);
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
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, '', JSON.stringify(response.error.developer_message)));
                }
                else {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'TargetSystemValidationError', JSON.stringify(response.error.developer_message)));
                }
            }          
                if (response.responseCode == '0000000') {
                    delete response.developer_message;
                   
                    return new APIResponse("Success", response, {});
                } else if (response.responseCode !== '0000000') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.responseCode, response.responseDescription, 'TargetSystemValidationError', JSON.stringify(response.developer_message)));
                }
                else {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'No Response Recieved From Backed System', 'TargetSystemError', JSON.stringify(response.developer_message)));
                }
            // if (response.error) {
            //     return response
            // } else {
            //     return new APIResponse("Success", response, {})
            // }
        } catch (error) {
            this.logger.error('Error while executing Fund Transfer Service perform method : ', error.stack);
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error.stack));
        }
    }

}

module.exports = fundTransferService;