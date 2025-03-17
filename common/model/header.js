const Joi = require('../../common/utils/validator/joiValidator').Joi

class CommonHeaders {
  constructor(xChannelId, xSubChannelId, xReqId, xCountryCode) {
    this.xChannelId = xChannelId
    this.xSubChannelId = xSubChannelId
    this.xReqId = xReqId
    this.xCountryCode = xCountryCode

  }

  validateSchema() {
    const schema = Joi.object().keys({
      xChannelId: Joi.string().required(),
      xSubChannelId: Joi.string().required(),
      xReqId: Joi.string().max(23).required(),
      xCountryCode: Joi.string().required(),

    })
    return Joi.validate(this, schema)
  }
}

module.exports = CommonHeaders
