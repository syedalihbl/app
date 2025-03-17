class Res_FundTransferModel {

    constructor(data) {
        this.responseCode = data.REPCODE
        this.responseDescription = data.REPMESSAGE
        this.uniqueReferenceId = data.UNQREFERENCE1
        this.cashTransactionReportAmount = data.CRTRXAMOUNT
    }
}

module.exports = Res_FundTransferModel