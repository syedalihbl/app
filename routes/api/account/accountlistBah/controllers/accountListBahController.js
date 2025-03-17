const loggerJs = require('../../../../../common/utils/logger/logger');
const accountListBahService = require('../services/accountListBahService');
const Authenticator = require('../../../../../common/authentication/channelsAuth')

const accountListBah = function(req, res) {
    const authRes = Authenticator.authenticate(req)
    if (authRes && authRes.error && authRes.error.type === 'Unauthorized') {
        res.status(401).send(authRes)

    } else {
        const logger = loggerJs.pinoChildInstance(req.headers['x-channel-id'], { reqId: req.headers['x-req-id'] })
        let service = new accountListBahService(req.headers, req.params, logger);
        service.perform().then((result) => {
            logger.info({ finalResponse: result }, 'Response Recieved from ACCOUNT LIST Service');

            if (result.error) {
                if (result.error.type === 'ValidationError') {
                    res.status(400).send(result)

                } else if (result.error.type === 'UnsuccessfulFromBackend') {
                    res.status(406).send(result)

                } else if (result.error.type === 'JSONValidation') {
                    res.status(501).send(result)

                } else if (result.error.type === 'TargetSystemError' ||
                    result.error.type === 'InternalAPIError') {
                    res.status(500).send(result)

                } else {
                    res.status(500).send(result)
                }
            } else {
                res.status(200).send(result)
            }

        }).catch((error) => {
            logger.error({ errorStack: error.stack }, 'Error in ACCOUNT LIST Controller while serving client request');
            res.status(500).send(error)
        })
    }
};
module.exports = {
    accountListBah: accountListBah
};