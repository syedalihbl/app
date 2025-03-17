class Res_FutureDateModel {

    constructor(result) {
        this.responseCode = result.OUTPUTPARM.RESPCODE;
        this.responseMessage = result.OUTPUTPARM.RESPMESSAGE;
        this.uniqueReference = result.OUTPUTPARM.UNQREFERENCE1;
        this.accountId = result.OUTPUTPARM.ACCOUNTID;
        this.futureDatePaymentId = result.OUTPUTPARM.FTRDATPAYID;
        this.futureDatePaymentDetail = result.OUTPUTPARM.FTRDATPAYDT;
        this.reference = result.OUTPUTPARM.REFERENCE;
        this.amount = result.OUTPUTPARM.AMOUNT;
        this.currency = result.OUTPUTPARM.CURRENCY;
        this.developer_message = result
    }
}

module.exports = Res_FutureDateModel;