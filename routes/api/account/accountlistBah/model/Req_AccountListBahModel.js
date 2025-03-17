const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_AccountListBahModel {

    constructor(nationalityIdentityNo) {
        this.nationalityIdentityNo = nationalityIdentityNo
    }

    validateSchema() {
        const schema = Joi.object().keys({
            nationalityIdentityNo: Joi.strict().required()
        })
        return Joi.validate(this, schema);
    }

}

module.exports = Req_AccountListBahModel;