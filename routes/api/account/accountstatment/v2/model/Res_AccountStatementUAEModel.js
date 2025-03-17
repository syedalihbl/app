class Res_AccountStatementModel {

  constructor(res,Certinfos) {
    if(res.RESCD !== '0000000'){
      this.responseCode = res.RESCD;
      this.responseDescription = res.RESMSG;
    }
    else if(res.RESCD == '0000000'){
    this.accountNo = "";   
    this.currencyCode =  res.CURRENCY;    
    this.customerName = "";
    this.accountTitle = res.TITLEOFACCOUNT;
    this.addressLine1 =  res.ADDRESLINE2;
    this.addressLine2 =  res.ADDRESLINE3;
    this.addressLine3 =  res.ADDRESLINE4;
    this.addressLine4 =  res.ADDRESLINE5;
    this.currencyDecimal = res.CCYDECIMAL;
    this.accountDescription = res.ACDESCRIPTION;
    this.branchCode = "";
    this.branchName = res.BRNAME;
    this.branchAddressLine1 = res.BRADDRESS1;
    this.branchAddressLine2 = res.BRADDRESS2;
    this.branchAddressLine3 = res.BRADDRESS3;
    this.accountDescription = res.ACDESCRIPTION
    ////this.openBalance = headers.OPENBALANCE;
    //this.closingBalance = headers.CLOSINGBALANC;      
    this.responseCode = res.RESCD;
    this.responseDescription = res.RESMSG;
    this.transactionDetails = [];
    
    for(var ln= 0 ; ln< Certinfos.length ; ln += 1){   
    this.transactionDetailsObj =  {};
    this.transactionDetailsObj.valueDate = "";
    this.transactionDetailsObj.transactionDate = Certinfos[ln].TRNDATE;
    this.transactionDetailsObj.postDate = "";    
    this.transactionDetailsObj.transactionReference = Certinfos[ln].REFERENCE;
    this.transactionDetailsObj.transactionDescription = "";

   // this.transactionDetailsObj.transactionAmount  = "";
    this.transactionDetailsObj.drFlag = Certinfos[ln].DRCRFLAG
    this.transactionDetailsObj.transactionDebitAmount  = Certinfos[ln].DEBITAMOUNT;
    this.transactionDetailsObj.transactionCreditAmount  = Certinfos[ln].CREDITAMOUNT;
    this.transactionDetailsObj.transactionType  = Certinfos[ln].TRNTYPE;
    this.transactionDetailsObj.transactionCurrency = Certinfos[ln].CURRENCY;    
    this.transactionDetailsObj.transactionCode = Certinfos[ln].TRNCODE;
    this.transactionDetailsObj.transactionSwiftCode = "";
    this.transactionDetailsObj.balanceSign= Certinfos[ln].BALANCESIGN

    this.transactionDetailsObj.transactionModule  = "";
    this.transactionDetailsObj.userReference  = "";
    this.transactionDetailsObj.balance = Certinfos[ln].BALANCE;   
    this.transactionDetailsObj.narration1 = Certinfos[ln].NARRATION1;
    this.transactionDetailsObj.narration2 = Certinfos[ln].NARRATION2;
    this.transactionDetailsObj.narration3 = Certinfos[ln].NARRATION3;
    this.transactionDetailsObj.narration4 = Certinfos[ln].NARRATION4;
    this.transactionDetails.push(this.transactionDetailsObj);

    }  
}}
}

module.exports = Res_AccountStatementModel;