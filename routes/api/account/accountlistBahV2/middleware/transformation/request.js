class ClientRequest {
    constructor(logger) {
        this.logger = logger
    }
    getPayloadRequest(apiRequest, inputUSER) {

        let date = null
        date = new Date()
        date = date.toJSON()
        date = date.replace(/-/g, '')
        date = date.replace(/:/g, '')
        date = date.substring(0, date.length - 5)
        date = date.split("T")

        return {
            "InputHeader": {
                "SerialNo": apiRequest.headers.xReqId,
                "InputDate": date[0],
                "InputTime": date[1],
                "UserID": inputUSER
            },
            "InputParm": {
                "BgCPR_No": apiRequest.body.nationalityIdentityNo
            }
        }
    }
}

module.exports = ClientRequest