const send = function (result, res) {
    if (result.error) {
        if (result.error.type == 'ValidationError') {
            res.status(400).send(result)
        } else if (
            result.error.type === 'UnsuccessfulFromBackend' ||
            result.error.type === 'TargetSystemValidationError') {
            res.status(406).send(result)
        } else if (result.error.type === 'APIInternalError') {
            res.status(500).send(result)
        } else if (result.error.type === 'TargetSystemError') {
            res.status(503).send(result)
        } else if (result.error.type === 'ReadTimeout') {
            res.status(598).send(result)
        } else if (result.error.type === 'ConnectTimeout') {
            res.status(599).send(result)
        } else {
            res.status(501).send(result)
        }

    } else {
        res.status(200).send(result)
    }
}

module.exports = {
    send: send
}
