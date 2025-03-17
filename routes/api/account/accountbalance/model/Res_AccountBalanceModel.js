class Res_AccountBalanceModel{

    constructor(accountNo, accountCurrency, accountBookBalance,accountHoldAmount,accountNetBalance,accountCurrentBalance,accountAvailableBalance,accountMinimumBalance,accountUnClearedFund){
        this.accountNo = accountNo;
        this.accountCurrency = accountCurrency;
        this.accountBookBalance = accountBookBalance;
        this.accountHoldAmount = accountHoldAmount;
        this.accountNetBalance = accountNetBalance;

        this.accountCurrentBalance = accountCurrentBalance;
        this.accountAvailableBalance = accountAvailableBalance;
        this.accountMinimumBalance = accountMinimumBalance;
        this.accountUnClearedFund = accountUnClearedFund;
    }
}

module.exports = Res_AccountBalanceModel;