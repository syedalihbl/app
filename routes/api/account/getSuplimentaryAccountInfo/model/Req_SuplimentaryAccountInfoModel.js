const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;


class Req_SuplimentaryAccountInfoModel {

    constructor(data) {
        // console.log(data.accountNo)
        this.accountNo = data.accountNo;
    }
    validateSchema() {
        const schema = Joi.object().keys({
            accountNo: Joi.strict().required()
        });

        return Joi.validate(this, schema);
    }

}

module.exports = Req_SuplimentaryAccountInfoModel;