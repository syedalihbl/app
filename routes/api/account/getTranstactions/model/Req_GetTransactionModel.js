const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_AccountDetailInquiryModel {

    constructor(data) {
        this.AccountId = data.AccountId;
        // console.log(data, 'data')
    }

    validateSchema() {
        const schema = Joi.object().keys({
            AccountId: Joi.strict().required()
        });

        return Joi.validate(this, schema);
    }

}

module.exports = Req_AccountDetailInquiryModel;