const Joi = require('../../../../../common/utils/validator/joiValidator').Joi

class Req_AccountListBahModel {
    constructor(nationalityIdentityNo) {
        this.nationalityIdentityNo = nationalityIdentityNo
    }

    validateSchema() {
        const schema = Joi.object().keys({
            nationalityIdentityNo: Joi.string().length(9).required()
        })
        return Joi.validate(this, schema)
    }
}

module.exports = Req_AccountListBahModel