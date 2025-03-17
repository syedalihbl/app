const ServicesAuthorizationJson = require('./channels')
const CommonHeaders = require('../model/header')
const APIResponse = require('../model/apiResponse')
const APIError = require('../model/apiError')

const authenticate = (req) => {

    this.commonHeader = new CommonHeaders(req.headers['x-channel-id'], req.headers['x-sub-channel-id'], req.headers['x-req-id'], req.headers['x-country-code'])
    const headerValidationResponse = this.commonHeader.validateSchema()
    if (headerValidationResponse.error) {
        return new APIResponse('Fail', {}, new APIError(this.commonHeader.xReqId, '', headerValidationResponse.error.details[0].message, headerValidationResponse.error.name, '', headerValidationResponse.error.details))
    }
    return authenticateChannel(this.commonHeader.xChannelId, req.route.path, this.commonHeader.xReqId)
}

const authenticateChannel = (channel, apiUrl, reqId) => {
    
    console.log('channel= '+channel+' ,apiUrl '+apiUrl);
    
    const channelObj = ServicesAuthorizationJson.find(row => row.url === apiUrl)
   
    if (channelObj) {
        const allowedChannelsArray = channelObj.allowedChannels
        console.log('authenticateChannel()', channel, channelObj.allowedChannels, (allowedChannelsArray.indexOf(channel) > -1))
        if (allowedChannelsArray.indexOf(channel) === -1) {
            return new APIResponse('Fail', {}, new APIError(reqId, '', 'You are not allowed to conduct this transction, Please contact with Adiminstrator for channel registration.', 'Unauthorized', '', 'Unauthorized Channel, Register a channel id with admiministrator.'))
        }
    } else {
        return new APIResponse('Fail', {}, new APIError(reqId, '', 'You are not allowed to conduct this transction, Please contact with Adiminstrator for channel registration.', 'Unauthorized', '', 'Unauthorized Channel, Register a channel id with admiministrator.'))
    }
}

module.exports = {
    authenticate: authenticate
}