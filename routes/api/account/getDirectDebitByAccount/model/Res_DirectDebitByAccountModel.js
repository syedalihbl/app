class Res_DirectDebitByAccountModel {

    constructor(result) {
        this.responseCode = result.RESPONSE.RESPCODE
        this.responseMessage = result.RESPONSE.RESPMESSAGE
        this.outparams = result

        // for (let rec of result.OUTPUTPARM) {
        //     const item = {
        //         "ACCNO": rec.ACCNO,
        //         "FREQUENCY": rec.FREQUENCY,
        //         "REFERENCE": rec.REFERENCE,
        //         "FIRSTPAYDT": rec.FIRSTPAYDT,
        //         "NEXTPAYDT": rec.NEXTPAYDT,
        //         "LASTPAYDT": rec.LASTPAYDT,
        //         "FINALPAYDT": rec.FINALPAYDT,
        //         "FIRSTPAYAMT": rec.FIRSTPAYAMT,
        //         "FIRSTPAYCURR": rec.FIRSTPAYCURR,
        //         "NEXTPAYAMT": rec.NEXTPAYAMT,
        //         "NEXTPAYCURR": rec.NEXTPAYCURR,
        //         "LASTPAYAMT": rec.LASTPAYAMT,
        //         "LASTPAYCURR": rec.LASTPAYCURR,
        //         "SCHEMENAME": rec.SCHEMENAME,
        //         "IDENTIFICATION": rec.IDENTIFICATION
                
        //     }
        //     if (item.ACCNO){

        //         this.outparams.push(item)
        //     }

        // }
    }
}

module.exports = Res_DirectDebitByAccountModel;