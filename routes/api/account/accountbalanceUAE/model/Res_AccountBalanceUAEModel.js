class Res_AccountBalanceModel{

    constructor(accountNo,result){
        this.accountNo = accountNo;
        this.accountCurrency = result.ACCOUNTCURRENCY;
        this.accountBookBalance = "";
        this.accountHoldAmount = "";
        this.accountNetBalance = "";

        this.accountCurrentBalance = "";
        this.accountAvailableBalance = result.AVAILBLEBALANCE;
        this.accountMinimumBalance = "";
        this.accountUnClearedFund = "";
        this.developer_message = result;
    }
}

module.exports = Res_AccountBalanceModel;