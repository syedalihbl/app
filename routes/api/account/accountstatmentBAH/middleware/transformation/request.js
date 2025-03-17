const APIUtil = require("../../../../../../common/utils/apiUtil")

class ClientRequest {
    constructor(logger) {
        this.logger = logger
    }

    getPayloadRequest(data) {
        const dateAndTime = APIUtil.getDateTimeArray()
        const payload = {
            "INPUTHEADER": {
                "SERIALNO": data.headers.xReqId,
                "REQDATE": dateAndTime[0],
                "REQTIME": dateAndTime[1]
            },
            "INPUTPARM": {
                "IBANNO": data.body.ibanNo,
                "FROMDATE": data.body.fromDate,
                "TODATE": data.body.toDate
            }
        }
        return payload
    }
}

module.exports = ClientRequest