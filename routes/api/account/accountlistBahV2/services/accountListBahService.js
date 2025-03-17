const config = require('config')
const CommonHeaders = require('../../../../../common/model/header')

const APIError = require('../../../../../common/model/apiError')
const APIRequest = require('../../../../../common/model/apiRequest')
const APIResponse = require('../../../../../common/model/apiResponse')

const ClientService = require('../middleware/clientService')
const Req_AccountListBahModel = require('../model/Req_AccountListBahModel')
// const { performance } = require('perf_hooks')
class accountListBahService {

    constructor(headers, body, logger) {
        this.logger = logger
        //console.log("Query:", body)

        this.logger.info({ headers: headers, params: body }, 'ACCOUNT LIST Service Object Initiated with Headers and Params')

        this.commonHeader = new CommonHeaders(headers['x-channel-id'], headers['x-sub-channel-id'], headers['x-req-id'], headers['x-country-code'])
        this.logger.debug({ commonHeaders: this.commonHeader }, 'Common Headers Object Constructed')

        this.accountListBahModel = new Req_AccountListBahModel(body.nationalityIdentityNo)
        this.logger.debug({ dataModel: this.accountListBahModel }, 'Request Model Object Constructed')

    }

    async perform() {
        // performance.mark('perform-service-start')

        try {
            // Header Params Validation
            // const headerValidationResponse = this.commonHeader.validateSchema();
            // this.logger.debug({ headerValidator: headerValidationResponse }, 'Request Headers Validation Performed')
            // if (headerValidationResponse.error) {
            //     this.logger.debug({ headerVaidatorMeesage: headerValidationResponse.error.details[0].message, headerVaidatorName: headerValidationResponse.error.name, headerVaidatorDetail: headerValidationResponse.error.details }, 'Request Headers Validation Fails, Raised API Error with following Parameters');
            //     return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, headerValidationResponse.error.details[0].message))

            // } else {
            //     // Body Params Validation
            //     const paramValidationResponse = this.accountListBahModel.validateSchema();
            //     this.logger.debug({ bodyValidator: paramValidationResponse }, 'Request Body Validation Performed');
            //     if (paramValidationResponse.error) {
            //         this.logger.debug({ bodyValidatorMessage: paramValidationResponse.error.details[0].message, bodyValidatorName: paramValidationResponse.error.name, bodyValidatorDetail: paramValidationResponse.error.details }, 'Request Parameter Validation Fails, Raised API Error with following Parameters')
            //         return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', paramValidationResponse.error.details[0].message, paramValidationResponse.error.name, paramValidationResponse.error.details[0].message))

            // } 
            // else {
            const apiRequest = new APIRequest(this.commonHeader, this.accountListBahModel, {}, {})
            this.logger.debug({ apiRequest: apiRequest }, 'ACCOUNT LIST API Request')

            const clientService = new ClientService(config.get('api.accountListByCPR.v2.api_type'), this.logger)
            this.logger.debug({ clientService: clientService }, 'ClientService object constructed')

            // await performance.mark('upstream-service-start')
            const response = await clientService.perform(apiRequest)
            // await performance.mark('upstream-service-end')


            // await performance.measure('Upstream Call duration', 'upstream-service-start', 'upstream-service-end')

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
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, '', JSON.stringify(response.error.developer_message)));
                }
                else {
                    return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.error.code, response.error.message, 'TargetSystemValidationError', response.error.developer_message));
                }
            }
            if (response.responseCode == '0000000') {
                delete response.developer_message;
                // delete response.responseCode;
                // delete response.responseMessage;
                // performance.mark('perform-call-end')
                // performance.measure(`Time taken by `, 'perform-service-start', 'perform-service-end')

                // performance.mark('perform-service-end')
                // performance.measure(`Time taken by upstream`, `upstream-start`, `upstream-end`)
                return new APIResponse("Success", response, {});
            } else if (response.responseCode !== '0000000') {

                // performance.mark('perform-service-end')
                // performance.measure(`Time taken by `, 'perform-service-start', 'perform-service-end')
                // performance.measure(`Time taken by upstream`, `upstream-start`, `upstream-end`)

                return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, response.responseCode, response.responseMessage, 'TargetSystemValidationError', JSON.stringify(response.developer_message.message)));
            }
            else {

                // performance.mark('perform-service-end')

                // performance.measure(`Time taken by `, 'perform-service-start', 'perform-service-end')
                // return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'No Response Recieved From Backed System', 'TargetSystemError', JSON.stringify(response.developer_message.message)));
            }
            // if (response.error) {
            //     return response
            // } else {
            //     return new APIResponse("Success", response, {})
            // }

        } catch (error) {
            console.log(error, 'error')
            this.logger.error({ errorStack: error.stack }, 'Error while executing ACCOUNT LIST Validation Service perform method');
            return new APIResponse("Fail", {}, new APIError(this.commonHeader.xReqId, '', 'Something went wrong to fullfull the results, Kindly contact with administrator.', 'APIInternalError', error));
        }


    }

}

module.exports = accountListBahService;