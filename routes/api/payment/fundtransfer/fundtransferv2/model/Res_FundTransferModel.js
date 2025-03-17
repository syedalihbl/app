class Res_FundTransferModel{

    constructor(result,CountryCode){
        this.uniqueReferenceId = result.OUTPUTPARM.UNQREFERENCE1;
        this.responseCode = result.OUTPUTPARM.REPCODE;
        this.responseDescription = result.OUTPUTPARM.REPMESSAGE;  
        if(CountryCode == "BAH"){
            this.crTrxAmount   = result.OUTPUTPARM.CRTRXAMOUNT
        }       
    }
}

module.exports = Res_FundTransferModel;