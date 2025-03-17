
//const loggerJs = require('../../../../../../common/utils/logger/logger');
const loggerJs = require('../../../../../common/utils/logger/logger');
const accountDetailsUAEService = require('../services/accountDetailsUAEService');
const Authenticator = require('../../../../../common/authentication/channelsAuth')

const accountDetailsUAE = function (req, res) {
    const authRes = Authenticator.authenticate(req)
    if (authRes && authRes.error && authRes.error.type === 'Unauthorized') {
      res.status(401)
      return res.send(authRes)
    }
    const logger = loggerJs.pinoChildInstance(req.headers['x-channel-id'], { reqId: req.headers['x-req-id'] })
    let service = new accountDetailsUAEService(req.headers, req.params,logger);
    service.perform().then((result) => {
        logger.debug('Response Recieved from Account Details UAE Service : ', result);
        if (result.error && result.error.type == 'ValidationError') {
            res.status(400).json(result);
            return res;
        }
        if (result.error && result.error.type == 'TargetSystemError') {
            res.status(599).json(result);
            return res;
        }
        res.status(200).json(result);
    }).catch((error) => {
        logger.error('Error in Account Holder UAE Controller while serving client request : ', error);
        res.status(500).json(error);
        return res;
    });
    return res;
};
module.exports = {
    accountDetailsUAE: accountDetailsUAE
}; 