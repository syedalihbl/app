const Joi = require('../../../../../../common/utils/validator/joiValidator').Joi;

class Req_AccountStatementModelList {

    constructor(body) {
    
        this.toDate = body.toDate
        this.fromDate = body.fromDate
        this.accountNo = body.accountNo   
        this.reqDate=  body.reqDate
        this.reqTime = body.reqTime   
                           
    }

    validateSchema() {
        const schema = Joi.object().keys({            
            toDate:  Joi.string().required(),
            fromDate:  Joi.string().required(),
            accountNo: Joi.string().min(14).max(14).required(),
            reqDate:  Joi.string().required(),
            reqTime:  Joi.string().required(),
                      
        });
        
        return Joi.validate(this, schema);
    }

}

module.exports = Req_AccountStatementModelList;