class ClientRequest {
    constructor(logger) {
        this.logger = logger
    }

    getPayloadRequest(data) {
        return {
            "INPUTHEADER": {
                "USER": data.body.initiatingUserId,
                "BRANCH": data.body.transactionInitiatedBranch,
                "POSTINGUSER": data.body.postingUserReference
            },
            "INPUTPARM": {
                "UNQREFERENCE": data.headers.xReqId,
                "BATCHNO": data.body.batchNo,
                "DRACCOUNT": data.body.debitAccountNo,
                "DRVALUEDATE": data.body.debitValueDate,
                "DRTRXCODE": data.body.debitTransactionCode,                
                "DRREFERENCE": data.body.debitRecordReference,
                "DRNARLINE1": data.body.debitNarration1,
                "DRNARLINE2": data.body.debitNarration2,
                "DRNARLINE3": data.body.debitNarration3,
                "DRNARLINE4": data.body.debitNarration4,
                "CRACCOUNT": data.body.creditAccountNo,
                "CRVALUEDATE": data.body.creditValueDate,
                "CRTRXCODE": data.body.creditTransactionCode,                
                "CRREFERENCE": data.body.creditRecordReference,
                "CRNARLINE1": data.body.creditNarration1,
                "CRNARLINE2": data.body.creditNarration2,
                "CRNARLINE3": data.body.creditNarration3,
                "CRNARLINE4": data.body.creditNarration4,
                "TRXAMOUNT": data.body.transactionAmount
            }
        }
    }
}

module.exports = ClientRequest