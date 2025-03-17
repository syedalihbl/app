class Res_AccStandingModel {

    constructor(result) {
        this.responseCode = result.RESPONSE.RESPCODE
        this.responseMessage = result.RESPONSE.RESPMESSAGE
        this.outparams = []
    
        for (let rec of result.OUTPUTPARM) {
            const item = {
                "uniqueReference": result.RESPONSE.UNQREFERENCE1,
                "accountNumber": rec.ACCNO,
                "frequency": rec.FREQUENCY,
                "reference": rec.REFERENCE,
                "firstPayDay": rec.FIRSTPAYDT,
                "nextPayDay": rec.NEXTPAYDT,
                "lastPayDay": rec.LASTPAYDT,
                // "finalPayDay": rec.FINALPAYDT,
                "fistPaymentAmount": rec.FIRSTPAYAMT,
                "firstPaymentCurrency": rec.FIRSTPAYCURR,
                "nextPaymentAmount": rec.NEXTPAYAMT,
                "nextPaymentCurrency": rec.NEXTPAYCURR,
                "lastPaymentAmount": rec.LASTPAYAMT,
                "lastPaymentCurrency": rec.LASTPAYCURR,
                "schemeName": rec.SCHEMENAME,
                "identification": rec.IDENTIFICATION
                
            }
            if (item.accountNumber){

                this.outparams.push(item)
            }

        }
    }
}

module.exports = Res_AccStandingModel;