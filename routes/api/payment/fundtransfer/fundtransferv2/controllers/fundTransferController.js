
const loggerJs = require('../../../../../../common/utils/logger/logger');
const FundTransferService = require('../services/fundTransferService');
const fundTransfer = function (req, res) {
        
    const logger = loggerJs.pinoChildInstance(req.headers['x-channel-id'], { reqId: req.headers['x-req-id'] })
    let service = new FundTransferService(req.headers, req.body, logger);
    service.perform().then((result) => {
        logger.info({finalResponse: result}, 'Response Recieved from Fund Transfer Service');
        if (result.error && result.error.type == 'ValidationError') {
            res.status(400).json(result);
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemValidationError') {
            res.status(406).json(result);
            return res;
        }
        else if (result.error && result.error.type == 'JSONValidation') {
            res.status(501).json(result);
            return res;
        }
        else if (result.error && result.error.type == 'ConnectTimeout') {
            res.status(599).json(result);
            return res;
        }
        else if (result.error && result.error.type == 'ReadTimeout') {
            res.status(598).json(result);
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemError') {
            res.status(503).json(result);
            return res;
        }
        else if (result.error && result.error.type == 'Unauthorized') {
            res.status(401).json(result);
            return res;
        }
        res.status(200).json(result);
    }).catch((error) => {
        logger.error({errorStack: error.stack}, 'Error in Fund Transfer Controller while serving client request');
        res.status(500).json(error.stack);
        return res;
    });
    return res;
};

module.exports = {
    fundTransfer: fundTransfer
}; 