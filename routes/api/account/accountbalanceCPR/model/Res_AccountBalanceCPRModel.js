class Res_AccountBalanceModel {

    constructor(accountNo, result, backend) {
        var accountBookBalance = result.ACBKBAL;
        var accountHoldAmount = result.ACHDAMT;

        var accountCurrentBalance = result.ACCRBAL;
        var accountAvailableBalance = result.ACAVBAL;
        var accountMinimumBalance = result.ACMNBAL;
        var accountUnClearedFund = result.ACUNCLBAL;


        this.accountNo = accountNo;
        this.accountCurrency = result.ACCURRENCY;
        this.creditDebitIndicator = result.accountCurrentBalance < 0 ? "D" : "C"
        this.accountBookBalance = accountBookBalance.toString();
        this.accountHoldAmount = accountHoldAmount.toString();
        this.accountNetBalance = "";

        this.accountCurrentBalance = accountCurrentBalance.toString();
        this.accountAvailableBalance = accountAvailableBalance.toString();
        this.accountMinimumBalance = accountMinimumBalance.toString();
        this.accountUnClearedFund = accountUnClearedFund.toString();
        this.resCode = result.RESPCODE;
        this.resDesc = result.RESPMESSAGE;
        this.developer_message = backend;
    }
}

module.exports = Res_AccountBalanceModel;