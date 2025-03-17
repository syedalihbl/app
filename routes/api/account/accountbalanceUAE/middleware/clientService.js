const config = require('config');
const Client = require('../../../../../clients/client');
const ClientResponse = require('../middleware/transformation/response');

class ClientService {

    constructor(client_name, logger) {
        this.logger = logger;       
       
        this.logger.debug('Account Balance client_name : ', JSON.stringify(client_name));
        this.client = new Client(client_name, {}, this.logger);
   
    }

    async perform(apiRequest) {        
      
        this.logger.debug('ClientService perform method invoked with parameters : ', apiRequest); 
        const result = await this.client.performRestRequest(apiRequest.headers, apiRequest.pathParams.accountNo,  config.get('api.accountBalanceUAE.v1.method'), config.get('api.accountBalanceUAE.v1.url')+"?ACCOUNTNUMBER="+apiRequest.pathParams.accountNo+"&APPROVEDLISTVALIDATION=N");
        //console.log(result)
        this.logger.info('Client Recieved Response', result);
     
        if (result.error) {            
            return result;
        }
        const clientResponse = new ClientResponse(this.logger);
        result.accountNo = apiRequest.pathParams.accountNo;       
        this.logger.debug('ClientResponse Object Constructed :',clientResponse)
        if(apiRequest.headers.xCountryCode == 'UAE'){
     
            return clientResponse.getPayloadResponse(apiRequest.headers, result);
            }
            else{
                return {
                    error: {code : "Unauthorized" , message: "You are not allowed to conduct this transction, Please contact with Adiminstrator for channel registration."}
                }
            }
    }
}

module.exports = ClientService;
