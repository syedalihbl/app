class Res_GetTransactionsModel {

    constructor(result) {
        this.responseCode = result.RESPONSE.RESPCODE
        this.responseMessage = result.RESPONSE.RESPDESC
        this.outparams = []

        for (let rec of result.OUTPUTPARM) {
            const item = {
                "EXTACCOUNT": rec.EXTACCOUNT,
                "POSTINGAMOUNT": rec.POSTINGAMOUNT,
                "TRANSCODE": rec.TRANSCODE,
                "CURRENCY": rec.CURRENCY,
                "TIMESTAMP": rec.TIMESTAMP,
                "NARRATIVE1": rec.NARRATIVE1,
                "NARRATIVE2": rec.NARRATIVE2,
                "NARRATIVE3": rec.NARRATIVE3,
                "NARRATIVE4": rec.NARRATIVE4
            }
            if (item.EXTACCOUNT) {

                this.outparams.push(item)
            }

        }
    }
}
module.exports = Res_GetTransactionsModel;