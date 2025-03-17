const config = require('config');
const { stdSerializers } = require('pino');


class ClientRequest {
    constructor(logger) {
        this.logger = logger;
        this.logger.debug('ClientRequest Object Initiated with Parameters : ', {});
    }
    getPayloadRequest(apiRequest) {
        this.logger.debug('ClientRequest getPayloadRequest method invoked with parameters :', apiRequest.headers);
        var date = new Date();           
            var mm =  String(date.getMonth() + 1).padStart(2, '0'); 
           
            var ss =  date.getDate().toString()  + mm  + date.getFullYear().toString()
            var time = date.getHours().toString()+ date.getMinutes().toString() + date.getSeconds().toString();
        return {
            "INPUTHEADER": {
                "SERIALNO": apiRequest.headers.xChannelId.substring(0, 2) + apiRequest.headers.xReqId,
                "REQDATE": ss,
                "REQTIME": time,
                "USERID": "WSPT"
            },
            "INPUTPARM": {
                "ACIBANN": apiRequest.pathParams.accountNo,
            }

        };
    }
}

module.exports = ClientRequest;