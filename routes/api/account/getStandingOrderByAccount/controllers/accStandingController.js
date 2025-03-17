const loggerJs = require('../../../../../common/utils/logger/logger');
const AccStandingService = require('../services/accStandingService');
// const Authenticator = require('../../../../../common/authentication/channelsAuth')

const AccStanding = function (req, res) {
    const logger = loggerJs.pinoChildInstance(req.headers['x-channel-id'], { reqId: req.headers['x-req-id'] })
    let service = new AccStandingService(req.headers, req.params, req.query, logger, req.body);
    service.perform().then((result) => {
        logger.debug('Response Recieved from Account Standing Service : ', result);
        //#region  start validation section

        if (result.error && result.error.type == 'ValidationError') {
            res.status(400).json(result);
            logger.info({ statusCode: 400, responseController: result }, 'In Conroller Response Account Standing Service ');
            return res;
        }
        else if (result.error && result.error.type == 'JSONValidation') {
            res.status(501).json(result);
            logger.info({ statusCode: 501, responseController: result }, 'In Conroller Response Account Standing Service ');
            return res;
        }
        else if (result.error && result.error.type == 'ConnectTimeout') {
            res.status(599).json(result);
            logger.info({ statusCode: 599, responseController: result }, 'In Conroller Response Account Standing Service ');
            return res;
        }
        else if (result.error && result.error.type == 'ReadTimeout') {
            res.status(598).json(result);
            logger.info({ statusCode: 598, responseController: result }, 'In Conroller Response Account Standing Service ');
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemValidationError') {
            res.status(406).json(result);
            logger.info({ statusCode: 406, responseController: result }, 'In Conroller Response Account Standing Service ');
            return res;
        }
        else if (result.error && result.error.type == 'TargetSystemError') {
            res.status(503).json(result);
            logger.info({ statusCode: 503, responseController: result }, 'In Conroller Response Account Standing Service ');
            return res;
        }
        //#endregion  end validation section
        res.status(200).json(result);
        logger.info({ statusCode: 200, responseController: result }, 'In Conroller Response Account Standing Service ');
    }).catch((error) => {

        logger.error({ errorStack: error.stack }, 'Error in Account Detail Inquiry V1 Controller while serving client request')
        //logger.error('Error in Account Detail Inquiry Controller while serving client request : ', error.stack);
        res.status(500).json(error.stack);
        logger.info({ statusCode: 500, responseController: error.stack }, 'In Conroller Response Account Standing Service ');
        return res;
    });
    return res;
};
module.exports = {
    AccStanding: AccStanding
}; 