const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_FutureDateModel {

    constructor(data) {
        this.account = data.pathParams.account;
    }

    validateSchema() {
        const schema = Joi.object().keys({
            account: Joi.strict().required()
        });
        return Joi.validate(this, schema);
    }

}

module.exports = Req_FutureDateModel;