class ClientRequest {

    constructor(logger) {
        this.logger = logger;
        this.logger.debug('ClientRequest Object Initiated with Parameters : ', {});
    }


    getPayloadRequest(data){
        this.logger.debug('ClientRequest getPayloadRequest method invoked with parameters :', data);
        if(data.headers.xChannelId == 'CRPL'){
            this.logger.debug("CRPL channel request is going to transform : ", data.headers.xChannelId);
            return {
                "INPUTHEADER": {
                    "USER": data.body.initiatingUserId,
                    "BRANCH": data.body.transactionInitiatedBranch,
                    "POSTINGUSER": data.body.postingUserReference
                },
                "INPUTPARM": {
                    "UNQREFERENCE": data.headers.xReqId,
                    "ORGREFERENCE": "",
                    "BATCHNO": data.body.batchNo,
                    "DRACCOUNT": data.body.debitAccountNo,
                    "DRTRXCODE": data.body.debitTransactionCode,
                    "DRVALUEDATE": "",
                    "DRREFERENCE": data.body.debitRecordReference,
                    "DRNARLINE1": data.body.debitNarration1,
                    "DRNARLINE2": data.body.debitNarration2,
                    "DRNARLINE3": data.body.debitNarration3,
                    "DRNARLINE4": data.body.debitNarration4,
                    "CRACCOUNT": data.body.creditAccountNo,
                    "CRTRXCODE": data.body.creditTransactionCode,
                    "CRVALUEDATE": "",
                    "CRREFERENCE": data.body.creditRecordReference,
                    "CRNARLINE1": data.body.CRNAR1,
                    "CRNARLINE2": data.body.CRNAR2,
                    "CRNARLINE3": data.body.CRNAR3,
                    "CRNARLINE4": data.body.CRNAR4,
                    "TRXAMOUNT": data.body.transactionAmount
                }
    
            };

            // logger.debug('Channel : ', channel, ' Generated Request Payload : ', generatedPayload);
            // return generatedPayload;
        }
    }

}



module.exports = ClientRequest;