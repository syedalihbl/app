class Res_AccountDetailsUAEModel {

    constructor(result) {
        var accountStatus = result.AccountStatusInactive == 'N' ? '00' : "01";
        if (result.AccountStatusBlocked == 'Y' || result.AccountClosing == 'Y') {
            accountStatus = '02';
        }
        return {
            "accountNo": result.accountNo,
            "accountBankImd": result.AccountBankImd,
            "basicPartOfAccountNo": result.AccountBasicNumber,
            "accountSuffix": result.AccountSuffix,
            "externalAccountNo": "",
            "accountType": result.AccountType,
            "accountTypeDescription": result.AccountTypeDescription,
            "accountStatus": accountStatus,
            "accountTitle": result.AccountTitle,
            "accountCurrency": result.AccountCurrency,
            "accountCurrencyDescription": result.AccountCurrencyDescription,
            "accountBranchCode": result.AccountBranchCode,
            "accountBranchName": result.AccountBranchName,
            "accountOpeningDate": result.AccountOpeningDate,
            "accountAvailableLimit": result.AccountAvailableLimit,
            "accountSpecialCondition": "",
            "accountDailyWithdrawlLimit": result.AccountDailyWithdralLimit,
            "accountFundsAdvanceLimit": result.AccountFundsAdvanceLimit,
            "hasChequeBook": result.HasChequeBook,
            "hasOverDraft": result.HasOverDraft,
            "isMinorAccount": result.IsMinorAccount,
            "hasJointAccount": result.HasJointAccount,
            "isSingleEitherJoint": "",
            "hasRelation": "",
            "hasSIFacility": result.HasSIFacility,
            "productName": result.ProductName,
            "productDescription": result.ProductDescription,
            "additionalInformation": {
                "arabicShortName": result.ArabicShortName
            }
        }
    }
}

module.exports = Res_AccountDetailsUAEModel;