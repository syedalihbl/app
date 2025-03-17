const Joi = require('../../../../../../common/utils/validator/joiValidator').Joi;

class Req_AccountStatementModelList {

    constructor(body) {
    
        this.toDate = body.toDate
        this.fromDate = body.fromDate
        this.accountNo = body.accountNo       
        this.totalRecordsToFetch  = body.totalRecordsToFetch
        this.minAmount = body.criteria.minAmount
        this.maxAmount = body.criteria.maxAmount
        this.recordLimit = body.criteria.recordLimit
        this.transactionType = body.criteria.transactionType                       
    }

    validateSchema() {
        const schema = Joi.object().keys({            
            toDate:  Joi.string().min(8).max(8).required(),
            fromDate:  Joi.string().min(8).max(8).required(),
            accountNo: Joi.string().min(14).max(14).required(),
            totalRecordsToFetch : Joi.optional(),
            minAmount: Joi.optional(),
            maxAmount: Joi.optional(),
            recordLimit: Joi.optional(),            
            transactionType: Joi.optional()            
        });
        
        return Joi.validate(this, schema);
    }

}

module.exports = Req_AccountStatementModelList;