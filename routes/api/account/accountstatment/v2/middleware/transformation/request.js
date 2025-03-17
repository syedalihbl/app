class ClientRequest {

    constructor(logger) {
        this.logger = logger;
        this.logger.debug('ClientRequest Object Initiated with Parameters : ', {});
    }


    getPayloadRequest(data) {

        this.logger.debug('ClientRequest getPayloadRequest method invoked with parameters :', data);
        this.logger.debug("CRPL channel request is going to transform : ", data.headers.xChannelId);

        if (data.headers.xCountryCode == 'UK') {
            let resp = {
                "TODATE": data.body.toDate,
                "FROMDATE": data.body.fromDate,
                "ACCTNUMBER": data.body.accountNo,
                "MAXAMOUNT": data.body.maxAmount,
                "MINAMOUNT": data.body.minAmount,
                "RECORDSLIMIT": data.body.recordLimit,
                "TRANSTYPE": data.body.transactionType
            };
            return resp;
        }
        if (data.headers.xCountryCode == 'UAE') {

            let resp = {
                "INPUTHEADER": {
                    "SERIALNO": data.headers.xChannelId.substring(0, 2) + data.headers.xReqId,
                    "REQDATE": data.body.reqDate,
                    "REQTIME": data.body.reqTime
                },
                "INPUTPARM": {
                    "ACCOUNTNO": data.body.accountNo,
                    "FROMDATE": data.body.fromDate,
                    "TODATE": data.body.toDate
                }
            };
            return resp;
        }

    }

}



module.exports = ClientRequest;