const Req_FundTransferModel = require('../model/Req_FundTransferModel');
const CommonHeaders = require('../../../../../../common/model/header');
const APIError = require('../../../../../../common/model/apiError');
const APIResponse = require('../../../../../../common/model/apiResponse');
const ClientService = require('../middleware/clientService');
const APIRequest = require('../../../../../../common/model/apiRequest');
const config = require('config');
const Req_FundTransferBahModel = require('../model/Req_FundTransferBahModel');

class fundTransferService {

    constructor(headers, body, logger) {
        this.logger = logger;
        this.logger.info({ headers: headers, body: body }, 'Fund Transfer Service Object Initiated with Headers and Params');
        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code']);
        this.logger.debug('Common Headers Object Constructed : ', this.commonHeader);
        if (headers['x-country-code'] == "UK") {
            this.fundTransferModel = new Req_FundTransferModel(body);

        }
        else {
            this.fundTransferModel = new Req_FundTransferBahModel(body.initiatingUserId,
                body.postingUserReference,
                body.transactionDate,
                body.transactionInitiatedBranch,
                body.transactionAmount,
                body.debitAccountNo,
                body.debitTransactionCode,
                body.debitRecordReference,
                body.debitValueDate,
                body.debitCurrency,
                body.debitNarration1,
                body.debitNarration2,
                body.debitNarration3,
                body.debitNarration4,
                body.creditAccountNo,
                body.creditTransactionCode,
                body.creditRecordReference,
                body.creditValueDate,
                body.creditCurrency,
                body.creditNarration1,
                body.creditNarration2,
                body.creditNarration3,
                body.creditNarration4,
                body.batchNo);
        }
        this.logger.debug('Fund Transfer Model Object Constructed : ', this.fundTransferModel);
    }

    async perform() {
        try {

            const headerValidationResponse = this.commonHeader.validateSchema();
            this.logger.debug('Request Headers Validation Performed : ', headerValidationResponse);
            if (headerValidationResponse.error) {
                this.logger.debug('Request Headers Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details));
            }
            //console.log(this.fundTransferModel.validateSchema(), "=============================")
            const bodyValidationResponse = this.fundTransferModel.validateSchema();
            //console.log(bodyValidationResponse, "=============================")
            this.logger.debug('Request Body Validation Performed : ', bodyValidationResponse);
            if (bodyValidationResponse.error) {
                this.logger.debug('Request Body Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', bodyValidationResponse.error.details[0].message, bodyValidationResponse.error.name, bodyValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', bodyValidationResponse.error.details[0].message, bodyValidationResponse.error.name, bodyValidationResponse.error.details));
            }
            const apiRequest = new APIRequest(this.commonHeader, this.fundTransferModel, {}, {});
            this.logger.debug('API Request Object Constructed : ', apiRequest);
            const clientService = new ClientService(config.get('api.fundTransfer.v2.api_type'), this.logger);
            this.logger.debug('ClientService object Constructed : ', clientService);
            const response = await clientService.perform(apiRequest);

            if (response.error) {
                if (response.error.code == 'unauthorized') {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, "", response.error.message, 'Unauthorized', response.error.developer_message));
                }
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
            if (response.responseCode == '0000000') {
                return new APIResponse("Success", response, {});
            } else if (response.responseCode !== '0000000') {
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

module.exports = fundTransferService;