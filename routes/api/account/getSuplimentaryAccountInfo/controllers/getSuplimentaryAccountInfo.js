const loggerJs = require('../../../../../common/utils/logger/logger');
const getSuplimentaryAccountInfoService = require('../services/getSuplimentaryAccountInfoService');

const getSuplimentaryAccountInfo = function (req, res) {
    const logger = loggerJs.pinoChildInstance(req.headers['x-channel-id'], { reqId: req.headers['x-req-id'] })
    let service = new getSuplimentaryAccountInfoService(req.headers, req.params, req.query, logger);


    service.perform().then((result) => {
        logger.debug('Response Recieved from Suplimentary account info Service : ', result);
        //#region  start validation section
        if (result.error && result.error.type == 'ValidationError') {
            res.status(400).json(result);
            logger.info({ statusCode: 400, responseController: result }, 'In Conroller Bahrain Open banking Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'JSONValidation') {
            res.status(501).json(result);
            logger.info({ statusCode: 501, responseController: result }, 'In Conroller Bahrain Open banking Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'ConnectTimeout') {
            res.status(599).json(result);
            logger.info({ statusCode: 599, responseController: result }, 'In Conroller Bahrain Open banking Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'ReadTimeout') {
            res.status(598).json(result);
            logger.info({ statusCode: 598, responseController: result }, 'In Conroller Bahrain Open banking Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemValidationError') {
            res.status(406).json(result);
            logger.info({ statusCode: 406, responseController: result }, 'In Conroller Bahrain Open banking Service V2');
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemError') {
            res.status(503).json(result);
            logger.info({ statusCode: 503, responseController: result }, 'In Conroller Bahrain Open banking Service V2');
            return res;
        }
        res.status(200).json(result);
        logger.info({ statusCode: 200, responseController: result }, 'In Conroller Bahrain Open banking Service V2');

    }).catch((error) => {

        logger.error({ errorStack: error.stack }, 'Error in Supplimentary account info Controller while serving client request')
        res.status(500).json(error.stack);
        logger.info({ statusCode: 500, responseController: error.stack }, 'In Conroller Supplimentary account info  Service V1');
        return res;
    });
    return res;
};
module.exports = {
    getSuplimentaryAccountInfo: getSuplimentaryAccountInfo
}; 