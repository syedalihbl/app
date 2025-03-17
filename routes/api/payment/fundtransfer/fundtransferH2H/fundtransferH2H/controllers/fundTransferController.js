
const loggerJs = require('../../../../../../common/utils/logger/logger')
const FundTransferService = require('../services/fundTransferService')

const fundTransfer = function (req, res) {

    const logger = loggerJs.pinoChildInstance(req.headers['x-channel-id'], { reqId: req.headers['x-req-id'] })
    let service = new FundTransferService(req.headers, req.body, logger);
    service.perform().then((result) => {
        logger.debug('Response Recieved from Fund Transfer Service : ', result);
        if (result.error && result.error.type == 'ValidationError') {
            res.status(400).json(result);
            logger.info({ statusCode: 400, responseController: result }, 'In Controller Response FundsTransfer Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'JSONValidation') {
            res.status(501).json(result);
            logger.info({ statusCode: 501, responseController: result }, 'In Controller Response FundsTransfer Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'ConnectTimeout') {
            res.status(599).json(result);
            logger.info({ statusCode: 599, responseController: result }, 'In Controller Response FundsTransfer Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'ReadTimeout') {
            res.status(598).json(result);
            logger.info({ statusCode: 598, responseController: result }, 'In Controller Response FundsTransfer Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemValidationError') {
            res.status(406).json(result);
            logger.info({ statusCode: 406, responseController: result }, 'In Controller Response FundsTransfer Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemError') {
            res.status(503).json(result);
            logger.info({ statusCode: 503, responseController: result }, 'In Controller Response FundsTransfer Service V2');
            return res;
        }
        res.status(200).json(result);
    }).catch((error) => {
        logger.error('Error in Fund Transfer Controller while serving client request : ', error.stack);
        res.status(500).json(error.stack);
        return res;
    });
};

module.exports = {
    fundTransfer
};