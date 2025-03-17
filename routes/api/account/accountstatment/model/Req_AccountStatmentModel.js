const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;

class Req_AccountStatmentModel {

    constructor(accountNo, fromDate, toDate) {
        this.accountNo = accountNo;
        this.fromDate = fromDate;
        this.toDate = toDate;
          
    }


    validateSchema() {
        const schema = Joi.object().keys({
            accountNo: Joi.strict().required().disallow(''),
            fromDate:  Joi.strict().required().disallow(''),
            toDate: Joi.strict().required().disallow('')
        });

        return Joi.validate(this, schema);
    }

}

module.exports = Req_AccountStatmentModel;