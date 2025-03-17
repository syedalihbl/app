class Res_AccountStatmentModel {
    constructor(data) {

        this.accountTitle = data.TITLEOFACCOUNT
        this.addressLine2 = data.ADDRESLINE2
        this.addressLine3 = data.ADDRESLINE3
        this.addressLine4 = data.ADDRESLINE4
        this.addressLine5 = data.ADDRESLINE5
        this.branchName = data.BRNAME
        this.branchAddress1 = data.BRADDRESS1
        this.branchAddress2 = data.BRADDRESS2
        this.branchAddress3 = data.BRADDRESS3
        this.currency = data.CURRENCY
        this.currencyDecimal = data.CCYDECIMAL
        this.currencyCode = data.CURRENCYCD
        this.accountDescription = data.ACDESCRIPTION

        this.transactionDetails = []

        for (let rec of data.OUTR) {
            const item = {
                transactionCode: rec.TRNCODE,
                transactionDate: rec.TRNDATE,                
                transactionType: rec.TRNTYPE,                
                transactionReference: rec.REFERENCE,
                debitAmount: rec.DEBITAMOUNT,
                creditAmount: rec.CREDITAMOUNT,                
                debitCreditFlag: rec.DRCRFLAG,
                balance: rec.BALANCE,
                balanceSign: rec.BALANCESIGN,
                narration1: rec.NARRATION1,
                narration2: rec.NARRATION2,
                narration3: rec.NARRATION3,
                narration4: rec.NARRATION4
            }
            if (item.transactionDate) {
                
                this.transactionDetails.push(item)
            }
        }
        this.responseCode = data.RESCD
        this.responseMessage = data.RESMSG
    }
}

module.exports = Res_AccountStatmentModel