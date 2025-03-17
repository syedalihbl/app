const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_AccountDetailInquiryModel {

    constructor(data) {
        this.accountNo = data.accountNo;
        // console.log(data, 'data')
    }

    validateSchema() {
        const schema = Joi.object().keys({
            accountNo: Joi.strict().required()
        });

        return Joi.validate(this, schema);
    }

}

module.exports = Req_AccountDetailInquiryModel;