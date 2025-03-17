const Req_AccountStatmentModel = require('../model/Req_AccountStatmentModel');
const CommonHeaders = require('../../../../../common/model/header');
const APIError = require('../../../../../common/model/apiError');
const APIResponse = require('../../../../../common/model/apiResponse');
const ClientService = require('../middleware/clientService');
const APIRequest = require('../../../../../common/model/apiRequest');
const config = require('config');

class accountStatmentService {

    constructor(headers, body, logger) {
        this.logger = logger;
        this.logger.debug('account statment  Service Object Initiated with Params : ', 'headers : ', headers, 'body :', body);
        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code']);
        this.logger.debug('Common Headers Object Constructed : ', this.commonHeader);      
        this.accountStatmentModel = new Req_AccountStatmentModel(body.accountNo, body.fromDate, body.toDate);
        this.logger.debug('account statment  Model Object Constructed : ', this.accountStatmentModel);
    }

    async perform() {
        try {
            
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
            this.logger.debug('API Request Object Constructed : ', apiRequest);
            const clientService = new ClientService(config.get('api.accountStatement.v1.api_type'), this.logger);
            this.logger.debug('ClientService object Constructed : ', clientService);
            const response = await clientService.perform(apiRequest);          
            this.logger.info('ClientService Recieved Response : ', response);           
            if (response.error) {
                return new  APIResponse("Fail", response, new APIError(this.commonHeader.xReqId,  "", "Validation Error", 'APIValidationError', ''));
            }
           
            return new APIResponse("Success", response, {});
        } catch (error) {
            this.logger.error('Error while executing account statment  Service perform method : ', error);
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error));
        }
    }

}

module.exports = accountStatmentService;