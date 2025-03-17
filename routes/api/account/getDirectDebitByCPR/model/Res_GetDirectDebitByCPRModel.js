class Res_GetDirectDebitByCPRModel {

    constructor(result) {
        this.responseCode = result.RESPONSE.RESPCODE
        this.responseMessage = result.RESPONSE.RESPMESSAGE
        this.outparams = []

        for (let rec of result.OUTPUTPARM) {
            const item = {
                "EXTACC": rec.EXTACC,
                "MANDATEID": rec.MANDATEID,
                "ACCOUNTNAME": rec.ACCOUNTNAME,
                "CURRENCY": rec.CURRENCY,                
            }
            if (item.EXTACC){

                this.outparams.push(item)
            }

        }
    }
}

module.exports = Res_GetDirectDebitByCPRModel;