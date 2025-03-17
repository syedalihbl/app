const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_GetFutureDatedPaymentModel {

    constructor(data) {
        this.accountNo = data.accountNo;
    }
    validateSchema() {
        const schema = Joi.object().keys({
            accountNo: Joi.strict().required()
        });

        return Joi.validate(this, schema);
    }

}

module.exports = Req_GetFutureDatedPaymentModel;