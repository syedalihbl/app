class Res_SuplimentaryAccountInfoModel {

    constructor(result) {
        this.responseCode = result.RESPONSE.RESPCODE
        this.responseMessage = result.RESPONSE.RESPMESSAGE
        this.outparams = result.OUTPUTPARM;
    }
}

module.exports = Res_SuplimentaryAccountInfoModel;