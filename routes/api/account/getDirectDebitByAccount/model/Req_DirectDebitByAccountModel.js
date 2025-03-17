const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_DirectDebitByAccountModel {

    constructor(data) {
        this.AccountId = data.pathParams.AccountId;
    }

    validateSchema() {
        const schema = Joi.object().keys({
            AccountId: Joi.string().required().length(14)
        });
        return Joi.validate(this, schema);
    }

}

module.exports = Req_DirectDebitByAccountModel;