class Res_AccountDetailsBahModel {

    constructor(accountNo,result,backend) {
        return {
            "accountIBAN": accountNo,
            "accountBankImd": "",
            "basicPartOfAccountNo": result.ACBASIC,
            "accountSuffix": result.ACSUFFIX,
            "externalAccountNo": result.ACEXTNUMBER,
            "accountType": result.ACTYPE,
            "accountTypeDescription": result.ACTYPEDESC,
            "accountStatus": result.ACSTATUS,
            "accountTitle": result.ACTITLE,
            "accountCurrency": result.ACCURRENCY,
            "accountCurrencyDescription": result.ACCURRDESC,
            "accountBranchCode": result.ACBRANCH,
            "accountBranchName": result.ACBRNNAME,
            "accountOpeningDate": result.ACOPNDATE,
            "accountAvailableLimit": "",
            "accountSpecialCondition": "",
            "accountDailyWithdrawlLimit": "",
            "accountFundsAdvanceLimit": "",
            "hasChequeBook": result.CHEQUEBOOK,
            "hasOverDraft": result.ODALLOWED,
            "isMinorAccount": result.MINORAC,
            "hasJointAccount": result.JOINTAC,
            "isSingleEitherJoint": result.SINGLEAC,
            "hasRelation": result.ACRELATION,
            "hasSIFacility": result.SIFACILITY,
            "productName": "",
            "productDescription": "",
            "additionalInformation": {
                "arabicShortName":""
            },
            "responseCode": result.RESPCODE,
            "responseDescription": result.RESPMESSAGE,
            "developer_message" : backend
        }
    }
}

module.exports = Res_AccountDetailsBahModel;