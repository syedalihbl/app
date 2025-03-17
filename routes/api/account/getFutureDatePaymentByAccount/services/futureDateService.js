
const CommonHeaders = require('../../../../../common/model/header');
const APIError = require('../../../../../common/model/apiError');
const APIResponse = require('../../../../../common/model/apiResponse');
const ClientService = require('../middleware/clientService');
const APIRequest = require('../../../../../common/model/apiRequest');
const config = require('config');
const Req_FutureDateModel = require('../model/Req_FutureDateModel');

class FutureDateService {

    constructor(headers, pathParams, queryParams, logger, body) {
        //console.log(pathParams);

        this.logger = logger;
        this.body = body
        this.logger.debug('Future Date Service  Object Initiated with Params : ', 'headers : ', headers, 'Params :', pathParams);
        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code']);
        this.FutureDateModel = new Req_FutureDateModel({ ReqType: queryParams.ReqType, Channel: queryParams.Channel, ReqUID: queryParams.ReqUID, pathParams })
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
            const apiRequest = new APIRequest(this.commonHeader, this.body, {}, this.FutureDateModel);
            this.logger.debug(this.commonHeader.xReqId, 'Bahrain Future Date Service API Request : ', JSON.stringify(apiRequest));
            const paramValidationResponse = this.FutureDateModel.validateSchema();
            this.logger.debug('Request Body Validation Performed : ', paramValidationResponse);
            if (paramValidationResponse.error) {
                this.logger.debug('Request Parameter Future Date Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details));
            }
            const clientService = new ClientService(config.get('api.getFutureDate.v2.api_type'), this.logger);
            this.logger.debug('ClientService object Constructed : ', clientService);
            const response = await clientService.perform(apiRequest);
            this.logger.info('ClientService Recieved Response : ', response);
            if (response.responseCode !== '405') {
                response.developer_message = response.developer_message
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.responseCode, response.responseMessage, 'TargetSystemValidationError', response.developer_message));
            } else if (response.responseCode === '405') {
                delete response.developer_message;
                delete response.responseCode;
                delete response.responseMessage;
                return new APIResponse("Success", response, {});
            } else {
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'No Response Recieved From Backed System', 'TargetSystemError', response.developer_message));
            }
        } catch (error) {
            this.logger.error('Error while executing Future Date Service perform method : ', error);
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error));
        }
    }

}

module.exports = FutureDateService;