const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;

class Req_AccountStatmentModel {
    constructor(body) {
        this.ibanNo = body.ibanNo
        this.toDate = body.toDate
        this.fromDate = body.fromDate
    }

    validateSchema() {
        const schema = Joi.object().keys({
            ibanNo: Joi.string().required().length(22),
            fromDate:  Joi.string().required().disallow('').length(8),
            toDate: Joi.string().required().disallow('').length(8)
        })
        return Joi.validate(this, schema)
    }
}

module.exports = Req_AccountStatmentModel