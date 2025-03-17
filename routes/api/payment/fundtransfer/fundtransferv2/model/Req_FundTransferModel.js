const Joi = require('../../../../../../common/utils/validator/joiValidator').Joi;

class Req_FundTransferModel {        
    constructor(body) {                
            this.transactionDate = body.transactionDate,
            this.transactionTime = body.transactionTime,
            this.transactionAmount = body.transactionAmount,
            this.debitAccountNo = body.debitAccountNo,    
            this.debitRecordReference = body.debitRecordReference, 
            this.debitNarration1 = body.debitNarration1,
            this.debitNarration2 = body.debitNarration2,            
            this.creditAccountNo = body.creditAccountNo    
        }
    validateSchema() {
        const schema = Joi.object().keys({           
            transactionDate: Joi.string().min(8).max(8).required(),
            transactionTime: Joi.string().min(5).max(6).required(),        
            transactionAmount: Joi.string().required(),
            debitRecordReference : Joi.optional(),
            debitAccountNo:  Joi.string().required(),            
            debitNarration1: Joi.string().required(),
            debitNarration2: Joi.string().required(),           
            creditAccountNo: Joi.string().required()            
        });
        return Joi.validate(this, schema);
    }
}
module.exports = Req_FundTransferModel;