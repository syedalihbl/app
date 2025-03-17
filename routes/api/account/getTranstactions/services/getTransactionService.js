
const CommonHeaders = require('../../../../../common/model/header');
const APIError = require('../../../../../common/model/apiError');
const APIResponse = require('../../../../../common/model/apiResponse');
const ClientService = require('../middleware/clientService');
const APIRequest = require('../../../../../common/model/apiRequest');
const Req_GetTransactionModel = require('../model/Req_GetTransactionModel');
const config = require('config');

class getTransactions {


    constructor(headers, pathParams, queryParams, logger) {

        this.logger = logger;
        this.logger.debug('Fund Transfer Service Object Initiated with Params : ', 'headers : ', headers, 'Params :', pathParams);
        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code']);
        this.GetTransactionModel = new Req_GetTransactionModel({ ReqType: queryParams.ReqType, Channel: queryParams.Channel, ReqUID: queryParams.ReqUID, AccountId: pathParams.AccountId })
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

            const apiRequest = new APIRequest(this.commonHeader, {}, {}, this.GetTransactionModel);
            this.logger.debug(this.commonHeader.xReqId, 'Bahrain Get Transaction API Request : ', JSON.stringify(apiRequest));
            const paramValidationResponse = this.GetTransactionModel.validateSchema();
            this.logger.debug('Request Body Validation Performed : ', paramValidationResponse);

            if (paramValidationResponse.error) {
                this.logger.debug('Request Parameter Balance Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details));
            }

            const clientService = new ClientService(config.get('api.getTransactionByCIF.v1.api_type'), this.logger);

            this.logger.debug('ClientService object Constructed : ', clientService);
            const response = await clientService.perform(apiRequest);
            this.logger.info('ClientService Recieved Response : ', response);
            if (response.developer_message.RESPONSE.REPCODE !== '0000') {
                response.developer_message = response.developer_message.RESPONSE
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.developer_message.ResultCode, response.developer_message.INFOMESSAGE, 'TargetSystemValidationError', response.developer_message));
            } else if (response.developer_message.RESPONSE.REPCODE === '0000') {
                response.outparams = await response.developer_message.OUTPUTPARM
                delete response.developer_message;
                return new APIResponse("Success", response, {});
            } else {
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'No Response Recieved From Backed System', 'TargetSystemError', response.developer_message));
            }
        } catch (error) {
            //console.log(error, 'error')
            this.logger.error('Error while executing Get Transaction Service perform method : ', error);
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error));
        }
    }

}

module.exports = getTransactions;