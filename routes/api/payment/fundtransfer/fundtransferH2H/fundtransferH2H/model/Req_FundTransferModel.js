const Joi = require('../../../../../../common/utils/validator/joiValidator').Joi

class Req_FundTransferModel {
    constructor(body) {

        this.initiatingUserId = body.initiatingUserId
        this.postingUserReference = body.postingUserReference
        this.transactionInitiatedBranch = body.transactionInitiatedBranch                

        this.batchNo = body.batchNo

        this.debitAccountNo = body.debitAccountNo
        this.debitValueDate = body.debitValueDate
        this.debitTransactionCode = body.debitTransactionCode        
        this.debitRecordReference = body.debitRecordReference

        this.debitNarration1 = body.debitNarration1
        this.debitNarration2 = body.debitNarration2
        this.debitNarration3 = body.debitNarration3
        this.debitNarration4 = body.debitNarration4

        this.creditAccountNo = body.creditAccountNo
        this.creditValueDate = body.creditValueDate
        this.creditTransactionCode = body.creditTransactionCode        
        this.creditRecordReference = body.creditRecordReference

        this.creditNarration1 = body.creditNarration1
        this.creditNarration2 = body.creditNarration2
        this.creditNarration3 = body.creditNarration3
        this.creditNarration4 = body.creditNarration4

        this.transactionAmount = body.transactionAmount
    }

    validateSchema() {
        const schema = Joi.object().keys({
            initiatingUserId: Joi.string().allow("").required(),
            postingUserReference: Joi.string().allow("").optional(),
            transactionInitiatedBranch: Joi.string().allow("").required(),
            
            batchNo: Joi.string().allow("").required(),
            
            debitAccountNo: Joi.string().allow("").required().length(14),
            debitValueDate: Joi.string().allow("").required().max(8),
            debitTransactionCode: Joi.string().allow("").required().max(3),
            debitRecordReference: Joi.string().allow("").required().max(16),

            debitNarration1: Joi.string().allow("").required().max(35),
            debitNarration2: Joi.string().allow("").required().max(35),
            debitNarration3: Joi.string().allow("").required().max(35),
            debitNarration4: Joi.string().allow("").required().max(35),

            creditAccountNo: Joi.string().allow("").required().length(14),
            creditValueDate: Joi.string().allow("").required().max(8),
            creditTransactionCode: Joi.string().allow("").required().max(3),
            creditRecordReference: Joi.string().allow("").required(),

            creditNarration1: Joi.string().allow("").required().max(35),
            creditNarration2: Joi.string().allow("").required().max(35),
            creditNarration3: Joi.string().allow("").required().max(35),
            creditNarration4: Joi.string().allow("").required().max(35),

            transactionAmount: Joi.string().allow("").required().length(13)
        })
        return Joi.validate(this, schema)
    }
}

module.exports = Req_FundTransferModel