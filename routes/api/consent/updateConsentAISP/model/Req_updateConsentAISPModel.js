const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;

class Req_updateConsentAISPModel {
    constructor(body) {
        this.consentId = body.consentId
        this.status = body.status
        this.cprNumber = body.cprNumber
        this.consentExpiryDatetime = body.consentExpiryDatetime
        this.accountNumber = body.accountNumber
    }

    validateSchema() {
        const schema = Joi.object({
            consentId: Joi.string().optional().allow('', null),
            status: Joi.string().optional().allow('', null),
            cprNumber: Joi.string().optional().allow('', null),
            consentExpiryDatetime: Joi.string().optional().allow('', null),
            accountNumber: Joi.optional().allow('', null)
        })
        return Joi.validate(this, schema)
    }
}

module.exports = Req_updateConsentAISPModel