const Res_AccountStatementModel = require('../../model/Res_AccountStatementModel');
const Res_AccountStatementUAEModel = require('../../model/Res_AccountStatementUAEModel');
class ClientResponse {

    constructor(logger) {
        this.logger = logger;
    }

    getPayloadResponse(headers, result) {
        this.logger.debug({ channelId: headers.xChannelId, result: result }, 'ClientResponse Payload Params')
        if (result) {
            if (headers.xChannelId === 'OB' || headers.xChannelId == 'MB' || headers.xChannelId == 'CRPL') {
                headers.xCountryCode = headers.xCountryCode.toUpperCase()            
                if (headers.xCountryCode === 'BAH') {
                    let res = new Res_AccountStatementModel(result)
                    res = res.accountStatement ? res.accountStatement : res
                    this.logger.debug({  res }, 'Client Request Conveverted to Account statement List Model');
                    return res
                } else if (headers.xCountryCode === 'UK') {
                    let res = new Res_AccountStatementModel(result)
                    res = res.accountStatement ? res.accountStatement : res
                    this.logger.debug({ res: res }, 'Client Request Conveverted to Account statement List Model');
                    return res;
                }else if (headers.xCountryCode === 'UAE') {
                    let res = new Res_AccountStatementUAEModel(result.OUTPUTPARM,result.OUTPUTPARM.OUTR)
                    //console.log(res,"===========================================res")
                    this.logger.debug({ res: res }, 'Client Request Conveverted to Account statement List Model');
                    return res;
                } else {

                    return {}
                }

            } else {
                return {}
            }
        } else {
            return {}
        }

    }

}



module.exports = ClientResponse;