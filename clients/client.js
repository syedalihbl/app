const config = require('config')
const ApiError = require('../common/model/apiError')
const SoapClient = require('../clients/soap/soapclient')
const RestClient = require('../clients/rest/restclient')

class Client {
  constructor(clientName, properties = { url: '', wsdl_path: '' }, logger) {
    this.logger = logger
    this.logger.debug(' Client Object Initiated with : ', clientName)
    if (clientName === 'SOAP') {
      this.logger.debug('Soap Client Parameters : ', properties.url, properties.wsdl_path)
      this.cSoap = new SoapClient(properties.url, properties.wsdl_path)
      this.logger.debug('Soap Client Object Cunstructed :', this.cSoap)
    } else if (clientName === 'REST') {
      this.logger.debug('REST Client Parameters : ', config.get('rest.requestTimeOut'))
      this.cRest = new RestClient(config.get('rest.requestTimeOut'), this.logger)
      this.logger.debug('REST Client Object Constrcuted :', this.cRest)
    } else if (clientName === 'DB') {
      this.logger.debug('DB Client Parameters : ')
    }
  }

  async performSoapRequest(xReqId, soapOperation, requestXML) {
    this.logger.debug('SOAP Operation Name : ', soapOperation)
    this.logger.debug('SOAP Request XML : ', requestXML)
    try {
      const client = await this.cSoap.getClient()
      this.logger.debug('SOAP Client constructed with Request xml :', requestXML)
      this.logger.debug('SOAP Client constructed : ', client)
      const [response, rawResponse, soapheader, rawRequest] = await client[soapOperation + 'Async'](requestXML)
      this.logger.debug('SOAP Client RAW Reqeust : ', rawRequest)
      this.logger.debug('SOAP Client Headers : ', soapheader)
      this.logger.debug('SOAP Client RAW Response : ', rawResponse)
      this.logger.info('SOAP Client Response : ', response)
      return response
    } catch (err) {
      this.logger.error('Error while performing SOAP Request : ', err)
      const response = await this.generateErrorResponse(err, xReqId)
      this.logger.info('API Error generated after recieving SOAP Error : ', response)
      return response
    }
  }

  async performRestRequest(headers, paramObj, methodType, requestUrl) {
    this.logger.debug('PerformRestRequest Recived Method Parameters : ', ' Headers : ', headers, 'paramObj : ', paramObj, 'methodType : ', methodType, 'requestUrl : ', requestUrl)
    try {
      const response = await this.cRest.execute(requestUrl, headers, methodType, paramObj)
      this.logger.info('RestClient Recieved Response : ', response)
      return response
    } catch (err) {
      this.logger.error('Error while performing Rest Request : ', err)
      const response = await this.generateErrorResponse(err, headers.xReqId)
      this.logger.info('API Error generated after recieving Rest Error : ', response)
      return response
    }
  }
  async performRestRequestFormData(headers, paramObj, methodType, requestUrl) {
    this.logger.debug('PerformRestRequest Recived Method Parameters : ', ' Headers : ', headers, 'paramObj : ', paramObj, 'methodType : ', methodType, 'requestUrl : ', requestUrl)
    try {
      const response = await this.cRest.executeFormData(requestUrl, headers, methodType, paramObj)
      this.logger.debug('RestClient Recieved Response : ', response)
      return response
    } catch (err) {
      this.logger.error('Error while performing Rest Request : ', err)
      const response = await this.generateErrorResponse(err, headers.xReqId)
      this.logger.debug('API Error generated after recieving Rest Error : ', response)
      return response
    }
  }
  async performDBRequest() {

  }

  async generateErrorResponse(err, xReqId) {
    const soapConnectionErrors = ['EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'READ_TIMEOUT', 'CONNECT_TIMEOUT']
    if (err) {
      if (soapConnectionErrors.includes(err.code)) {
        if (err.syscall === 'connect') {
          return { error: (new ApiError(xReqId, '', 'Connection timeout', 'TargetSystemError', err)) }
        } else {
          return { error: (new ApiError(xReqId, '', 'Read timeout', 'TargetSystemError', err)) }
        }
      }
      if (err.statusCode && err.statusCode !== 200) {
        return { error: (new ApiError(xReqId, '', err.message, 'TargetSystemError', err)) }
      }

      return { error: (new ApiError(xReqId, '', 'The service is not responding currently, Kindly try again or contact with Administrator.', 'TargetSystemError', err)) }
    }
  }
}

module.exports = Client
