class Res_AccountStatementModel {

  constructor(res) {

    //console.log('response FROM response ',res )		
    let accountStatement = [];
    if (res && 
        res.CS && 
        res.CS.CSVALUE && 
        res.CS.CSVALUE.length > 0) {

      res.CS.CSVALUE.forEach((element) => {
         accountStatement.push({
          "accountNo": "",
          "branchCode": "",
          "branchName": "",
          "currencyCode": "",
          "customerName": "",
          "openBalance": element.ACCTOPENBAL,
          "closingBalance": element.ACCTCLOSEBAL,
          "transactions": [
            {
              "valueDate": element.TXNVALDATE,
              "transactionDate": "",
              "postDate": element.TXNPOSTDATE,
              "transactionReference": element.TXNREF,
              "transactionDescription": element.TXNDESC,
              "transactionAmount": element.TXNAMOUNT,
              "transactionType": "",
              "transactionCurrency":element.TXNCUR,
              "transactionCode": element.TXNCODE,
              "transactionSwiftCode": "",
              "transactionModule": "",
              "userReference": element.USRREF,
              "runningBalance": element.RUNNINGBAL,
              "narration1": element.NARRATION1,
              "narration2": element.NARRATION2,
              "narration3": element.NARRATION3,
              "narration4": element.NARRATION4
            }
            ]
        });
    
      });
    }
    this.accountStatement = accountStatement;
  }
}

module.exports = Res_AccountStatementModel;