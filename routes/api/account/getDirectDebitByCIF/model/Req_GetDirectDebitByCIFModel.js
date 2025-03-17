const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_GetDirectDebitByCIFModel {

    constructor(data) {
        this.cifNo = data.cifNo;
        // console.log(data, 'data')
    }

    validateSchema() {
        const schema = Joi.object().keys({
            cifNo: Joi.strict().required()
        });

        return Joi.validate(this, schema);
    }

}

module.exports = Req_GetDirectDebitByCIFModel;