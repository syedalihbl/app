const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_GetDirectDebitByCPRModel {

    constructor(data) {
        this.cprNo = data.cprNo;
    }
    validateSchema() {
        const schema = Joi.object().keys({
            cprNo: Joi.string().required().length(9)
        });

        return Joi.validate(this, schema);
    }

}

module.exports = Req_GetDirectDebitByCPRModel;