
//const loggerJs = require('../../../../../../common/utils/logger/logger');
const loggerJs = require('../../../../../common/utils/logger/logger');
const accountBalanceService = require('../services/accountBalanceUAEService');
const Authenticator = require('../../../../../common/authentication/channelsAuth')

const accountBalanceUAE = function (req, res) {    
    const authRes = Authenticator.authenticate(req)    
    if (authRes && authRes.error && authRes.error.type === 'Unauthorized') {
      res.status(401)
      return res.send(authRes)
    }
    const logger = loggerJs.pinoChildInstance(req.headers['x-channel-id'], { reqId: req.headers['x-req-id'] })
    let service = new accountBalanceService(req.headers, req.params,logger);
    service.perform().then((result) => {
        logger.debug('Response Recieved from Fund Transfer Service : ', result);
        if (result.error && result.error.type == 'ValidationError') {
            res.status(400).json(result);
            logger.info({statusCode: 400 , responseController: result}, 'In Conroller Response Account Balance UAE Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'JSONValidation') {
            res.status(501).json(result);
            logger.info({statusCode: 501 , responseController: result}, 'In Conroller Response Account Balance UAE Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'ConnectTimeout') {
            res.status(599).json(result);
            logger.info({statusCode: 599 , responseController: result}, 'In Conroller Response Account Balance UAE Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'ReadTimeout') {
            res.status(598).json(result);
            logger.info({statusCode: 598 , responseController: result}, 'In Conroller Response Account Balance UAE Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemValidationError') {
            res.status(406).json(result);
            logger.info({statusCode: 406 , responseController: result}, 'In Conroller Response Account Balance UAE Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemError') {
            res.status(503).json(result);
            logger.info({statusCode: 503 , responseController: result}, 'In Conroller Response Account Balance UAE Service V2');
            return res;
        }
        res.status(200).json(result);
        logger.info({statusCode: 200 , responseController: result}, 'In Conroller Response Account Balance UAE Service V2');
    }).catch((error) => {
        
        logger.error({ errorStack: error.stack }, 'Error in Account Balance UAE V2 Controller while serving client request')
        //logger.error('Error in Account Balance UAE Controller while serving client request : ', error.stack);
        res.status(500).json(error.stack);
        logger.info({statusCode: 500 , responseController: error.stack}, 'In Conroller Response Account Balance UAE Service V2');
        return res;
    });
    return res;
};
module.exports = {
    accountBalanceUAE: accountBalanceUAE
}; 