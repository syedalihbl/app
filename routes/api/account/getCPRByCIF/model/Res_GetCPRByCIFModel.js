class Res_GetCPRByCIFModel {

    constructor(result) {
        this.responseCode = result.RESPONSE.RESPCODE
        this.responseMessage = result.RESPONSE.RESPMESSAGE
        this.cprNo = result.OUTPUTPARM[0].CPRNO || ''
        this.outparams = []

        for (let rec of result.OUTPUTPARM) {
            const item = {
                "ibanNo": rec.IBANNO,
                "name": rec.NAME,
                "accountNo": rec.ACCOUNTNO,
                "currency": rec.CURRENCY,
                
            }
            if (item.accountNo){

                this.outparams.push(item)
            }

        }
    }
}

module.exports = Res_GetCPRByCIFModel;