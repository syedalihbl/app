const Joi = require('../../../../../common/utils/validator/joiValidator').Joi

class Req_fetchConsentAISPModel {
    constructor(consentId) {
        this.consentId = consentId
    }

    validateSchema() {
        const schema = Joi.object().keys({
            consentId: Joi.string().required()
        })
        return Joi.validate(this, schema)
    }
}

module.exports = Req_fetchConsentAISPModel