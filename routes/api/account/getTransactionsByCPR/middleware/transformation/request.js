class ClientRequest {

    constructor(logger) {
        this.logger = logger;
        this.logger.debug('ClientRequest Object Initiated with Parameters : ', {});
    }



    getPayloadRequest(data){
       
        this.logger.debug('ClientRequest getPayloadRequest method invoked with parameters :',data);
        if(data.headers.xChannelId == 'MB'){
            
            const generatedPayload = {             
                    "CPRNO": data.body.cprNo,
                    "STARTDATE": data.body.fromDate,
                    "ENDDATE": data.body.toDate,
                
                };              
            this.logger.debug(' Generated Request Payload : ', generatedPayload);
            return generatedPayload;
        }
    }

}



module.exports = ClientRequest;