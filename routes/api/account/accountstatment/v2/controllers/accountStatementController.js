const loggerJs = require('../../../../../../common/utils/logger/logger');
const AccountStatementService = require('../services/accountStatement');

const accountStatment = function(req, res) {      
    const logger = loggerJs.pinoChildInstance(req.headers['x-channel-id'], { reqId: req.headers['x-req-id'] })
    const service = new AccountStatementService(req.headers, req.body, logger);
    service.perform().then((result) => {
        logger.info({ finalResponse: result }, 'Response Recieved from Fund Transfer Service');
        if (result.error && result.error.type == 'ValidationError') {
            res.status(400).send(result)                    
        } else if (result.error && result.error.type == 'TargetSystemValidationError') {
            res.status(406).send(result);
            return res;
        }
        else if (result.error && result.error.type == 'JSONValidation') {
            res.status(501).send(result);
            return res;
        }
        else if (result.error && result.error.type == 'ConnectTimeout') {
            res.status(599).send(result);
            return res;
        }
        else if (result.error && result.error.type == 'ReadTimeout') {
            res.status(598).send(result);
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemError') {
            res.status(503).send(result);
            return res;
        }
        res.status(200).send(result);
    }).catch((error) => {        
        logger.error({ errorStack: error.stack }, 'Error in Account Statement Controller while serving client request');
        res.status(500).json(error.stack);
        return res;        
    });
    return res;
};
module.exports = {
    accountStatment
}