const APIUtil = require("../../../../../../common/utils/apiUtil")

class ClientRequest {
    constructor(logger) {
        this.logger = logger
    }

    getPayloadRequest(data) {
        const dateAndTime = APIUtil.getDateTimeArray()
        // const payload =  data.body;
        const payload =  {
            consentID : data.body.consentId,
            status : data.body.status,
            cprNumber : data.body.cprNumber,
            consentExpiryDatetime : data.body.consentExpiryDatetime,
            AccountNumbers : data.body.accountNumber
        };
        return payload
    }
}

module.exports = ClientRequest