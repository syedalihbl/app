class Res_GetBalancesModel {

    constructor(accountNo, result) {
        this.reqType = result.ReqType;
        this.reqUid = result.ReqUID;
        this.resultCode = result.ResultCode;
        this.message = result.Message;
        this.records = result.Records;
        this.developer_message = result;
    }
}

module.exports = Res_GetBalancesModel;