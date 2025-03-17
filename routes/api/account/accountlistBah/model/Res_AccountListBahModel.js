class Res_AccountListBahModel {

    constructor(resultArray) {
        this.transactionDetails = [];
        // for (var ln = 0; ln < resultArray.length; ln++) {
        for (var result of resultArray) {

            // this.transactionDetailsObj.BHNEAN = resultArray[ln].BHNEAN;
            // this.transactionDetailsObj.BHNEIBAN = resultArray[ln].BHNEIBAN;

            // this.transactionDetailsObj.BHACT = resultArray[ln].BHACT;
            // this.transactionDetailsObj.BHSHN = resultArray[ln].BHSHN;

            // this.transactionDetailsObj.BHI14I = resultArray[ln].BHI14I;
            // this.transactionDetailsObj.BHI17I = resultArray[ln].BHI17I;

            // this.transactionDetailsObj.BHI20I = resultArray[ln].BHI20I;
            // this.transactionDetailsObj.BHI30I = resultArray[ln].BHI30I;

            // this.transactionDetailsObj.BHCCY = resultArray[ln].BHCCY;
            // this.transactionDetailsObj.BHABC = resultArray[ln].BHABC;

            // this.transactionDetailsObj.BHCB = resultArray[ln].BHCB;
            // this.transactionDetailsObj.BHOD = resultArray[ln].BHOD;

            // this.transactionDetailsObj.BHJA = resultArray[ln].BHJA;
            // this.transactionDetailsObj.BHMA = resultArray[ln].BHMA;

            // this.transactionDetailsObj.BHSI = resultArray[ln].BHSI;

            const detailObject = {
                "accountNumber": result.ExtAcNumber,
                "ibanAccountNumber": result.IBANNumber,
                "accountType": result.AcType,
                "accountTitle": result.ShortName,
                "accountCurrency": result.AcCurrency,
                "accountBranchCode": result.AcBranch,
                "accountConditions": {
                    "isOdAllowed": result.ODAllowed,
                    "hasSIFacility": result.SI,
                    "isDeceasedOrLiquid": result.DeceasedLiquid,
                    "isAccountBlocked": result.AcBlocked,
                    "isAccountInactive": result.AcInactive,
                    "isAccountClosed": result.AcClosing,
                    "hasCheckBook": result.ChequeBook,
                    "hasJointAccount": result.JointAc,
                    "isMinorAccount": result.MinorAc
                }
            }

            this.transactionDetails.push(detailObject)
        }
    }
}

module.exports = Res_AccountListBahModel;