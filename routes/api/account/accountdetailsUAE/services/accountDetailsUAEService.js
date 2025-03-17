
const CommonHeaders = require('../../../../../common/model/header');
const APIError = require('../../../../../common/model/apiError');
const APIResponse = require('../../../../../common/model/apiResponse');
const ClientService = require('../middleware/clientService');
const APIRequest = require('../../../../../common/model/apiRequest');
const Req_AccountDetailsUAEModel = require('../model/Req_AccountDetailsUAEModel');
const config = require('config');

class accountDetailsUAEService {

    constructor(headers, pathParams, logger) {
        this.logger = logger;
    
        this.logger.debug('Account Holder UAE Service Object Initiated with Params : ', 'headers : ', headers, 'Params :', pathParams);
        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code']);
        this.accountDetailsUAEModel = new Req_AccountDetailsUAEModel(pathParams.account)
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
           
            const apiRequest = new APIRequest(this.commonHeader, {}, {},this.accountDetailsUAEModel);
            this.logger.debug(this.commonHeader.xReqId, 'accountDetailsUAE API Request : ', JSON.stringify(apiRequest));
            const paramValidationResponse = this.accountDetailsUAEModel.validateSchema();
            this.logger.debug('Request Body Validation Performed : ', paramValidationResponse);
           
            if (paramValidationResponse.error) {
                this.logger.debug('Request Parameter Validation Fails, Raised API Error with following Parameters : ', this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details);
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details));
            }
            const clientService = new ClientService(config.get('api.accountDetailsUAE.v1.api_type'),this.logger);
          
            this.logger.debug('ClientService object Constructed : ', clientService);
            const response = await clientService.perform(apiRequest);
            if(JSON.stringify(response) == '{}')
            {
                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Invalid A/c No.', 'ValidationError', response));
            }
            this.logger.info('ClientService Recieved Response : ', response);
            if (response.error) {              
                return new APIResponse("Fail", {}, response);
            }
            return new APIResponse("Success", response, {});
        } catch (error) {
            this.logger.error('Error while executing Account Validation Service perform method : ', error);
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error));
        }
    }

}

module.exports = accountDetailsUAEService;