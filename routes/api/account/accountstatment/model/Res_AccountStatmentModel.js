class Res_AccountStatmentModel{
    constructor(headers, HrePly, Certinfos){
        this.accountNo = "";
        this.branchCode = Certinfos[0].BRANCHCODE;
        this.branchName = "";
        this.currencyCode =  Certinfos[0].CURRENCY;    
        this.customerName = headers.OPERANAME;
        this.openBalance = headers.OPENBALANCE;
        this.closingBalance = headers.CLOSINGBALANC;      
        this.transactionDetails = [];
        
        for(var ln= 0 ; ln< Certinfos.length ; ln += 1){   
        this.transactionDetailsObj =  {};
        this.transactionDetailsObj.valueDate = "";
        this.transactionDetailsObj.transactionDate = Certinfos[ln].TRANDATE;
        this.transactionDetailsObj.postDate = "";    
        this.transactionDetailsObj.transactionReference = Certinfos[ln].HOSTNO;
        this.transactionDetailsObj.transactionDescription = "";

        this.transactionDetailsObj.transactionAmount  = Certinfos[ln].AMOUNT;
        this.transactionDetailsObj.transactionType  = "";
        this.transactionDetailsObj.transactionCurrency = Certinfos[ln].CURRENCY;    
        this.transactionDetailsObj.transactionCode = "";
        this.transactionDetailsObj.transactionSwiftCode = "";

        this.transactionDetailsObj.transactionModule  = "";
        this.transactionDetailsObj.userReference  = "";
        this.transactionDetailsObj.runningBalance = Certinfos[ln].BALANCE;   
        this.transactionDetailsObj.narration1 = Certinfos[ln].NARRATION1;
        this.transactionDetailsObj.narration2 = Certinfos[ln].NARRATION2;
        this.transactionDetailsObj.narration3 = Certinfos[ln].NARRATION3;
        this.transactionDetailsObj.narration4 = Certinfos[ln].NARRATION4;
        this.transactionDetails.push(this.transactionDetailsObj);

        }  
    }
}
module.exports = Res_AccountStatmentModel;