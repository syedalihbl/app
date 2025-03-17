const config = require('config');
const utility = require('../../../../../../../common/utils/utility');

class ClientRequest {
    constructor(logger) {
        this.logger = logger;
        this.logger.debug('ClientRequest Object Initiated with Parameters : ', {});
    }
    getPayloadRequest(data){
        this.logger.debug('ClientRequest getPayloadRequest method invoked with parameters :', data);    
       //console.log(data.headers.xCountryCode,"============sss")    
        if( data.headers.xCountryCode == 'UK'){           
            this.logger.debug("CRPL channel request is going to transform : ", data.headers.xChannelId);            
            return {              
                "INPUTHEADER": {
                    "SERIALNO"    :  data.headers.xReqId,
                    "REQDATE"     :  data.body.transactionDate ,
                    "REQTIME"     :  data.body.transactionTime,
                    "SERVICENAME" :  "FundTransferUKM24x7" ,
                    "CHANNELNAME" :  utility.getTargetSystemChannel() ,
                    "USER"        :  "WSPT" , //"WSPT"
                    "BRANCH"      :  "1040", //"1040"
                    "POSTINGUSER" :  "WSPT" // "WSPT"
                },                
                "INPUTPARM": {
                    "UNQREFERENCE": data.headers.xReqId,
                    "BATCHNO"     : "UKOFT",
                    "DRACCOUNT"   : data.body.debitAccountNo,
                    "DRTRXCODE"   : "430",
                    //"DRVALUEDATE" : data.body.debitValueDate,
                    //"DRREFERENCE" : data.body.debitRecordReference,
                    "DRNARLINE1"  : data.body.debitNarration1,
                    "DRNARLINE2"  : data.body.debitNarration2,
                    //"DRNARLINE3"  : data.body.debitNarration3,
                    //"DRNARLINE4"  : data.body.debitNarration4,
                    "CRACCOUNT"   : data.body.creditAccountNo,
                    "CRTRXCODE"   : "930",
                    //"CRVALUEDATE" : data.body.creditValueDate,
                    //"CRREFERENCE" : data.body.creditRecordReference,
                    "CRNARLINE1"  : data.body.debitNarration1,  // same as drnarration1
                    "CRNARLINE2"  : data.body.debitNarration2,  // same as drnarration2
                    //"CRNARLINE3"  : data.body.creditNarration3 ,
                    //"CRNARLINE4"  : data.body.creditNarration4 ,                
                    "TRXAMOUNT"   : data.body.transactionAmount                
                }    
            };            
        }
        if( data.headers.xCountryCode == 'BAH'||  data.headers.xCountryCode == 'UAE'){
            //console.log("===============BAH")
            return {
                "INPUTHEADER": {
                    "USER": data.body.initiatingUserId,//hardcode
                    "BRANCH": data.body.transactionInitiatedBranch,
                    "POSTINGUSER": data.body.postingUserReference//hardcode
                },
                "INPUTPARM": {
                    "UNQREFERENCE": data.headers.xChannelId.substring(0, 2) + data.headers.xReqId,
                   
                    "BATCHNO": data.body.batchNo,//hardcode
                    "DRACCOUNT": data.body.debitAccountNo,
                    "DRTRXCODE": data.body.debitTransactionCode,//hardcode
                    "DRVALUEDATE": data.body.debitValueDate,
                    "DRREFERENCE": data.body.debitRecordReference,
                    "DRNARLINE1": data.body.debitNarration1,
                    "DRNARLINE2": data.body.debitNarration2,
                    "DRNARLINE3": data.body.debitNarration3,
                    "DRNARLINE4": data.body.debitNarration4,
                    "CRACCOUNT": data.body.creditAccountNo,
                    "CRTRXCODE": data.body.creditTransactionCode,//hardcode
                    "CRVALUEDATE": data.body.creditValueDate,
                    "CRREFERENCE": data.body.creditRecordReference,
                    "CRNARLINE1": data.body.creditNarration1,
                    "CRNARLINE2": data.body.creditNarration2,
                    "CRNARLINE3": data.body.creditNarration3,
                    "CRNARLINE4": data.body.creditNarration4,
                    "TRXAMOUNT": data.body.transactionAmount
                }

            };
        }
    }
}
module.exports = ClientRequest;