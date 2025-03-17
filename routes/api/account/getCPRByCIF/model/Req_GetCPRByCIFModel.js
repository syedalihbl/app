const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_GetCPRByCIFModel {

    constructor(data) {
        this.cifNo = data.cifNo;
    }
    validateSchema() {
        const schema = Joi.object().keys({
            cifNo: Joi.string().required()
        });

        return Joi.validate(this, schema);
    }

}

module.exports = Req_GetCPRByCIFModel;