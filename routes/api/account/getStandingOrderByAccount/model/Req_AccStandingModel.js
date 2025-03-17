const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_AccStandingModel {

    constructor(data) {
        this.AccountId = data.pathParams.AccountId;
    }

    validateSchema() {
        const schema = Joi.object().keys({
            AccountId: Joi.strict().required()
        });
        return Joi.validate(this, schema);
    }

}

module.exports = Req_AccStandingModel;