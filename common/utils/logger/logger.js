const pino = require('pino')
const config = require('config')

const options = {
    level: process.env.LOG_LEVEL || config.get('logging.level'),
    timestamp: () => {
        return ', "time":"' + new Date().toLocaleString() + "\""
    },
    useLevelLabels: true
}

// const pinoInstance = (channel) => {
//     if (channel) {
//         return pino(options, pino.destination(config.get('logging.base_path') + channel + '.log'))
//     }
//     return pino(options, pino.destination(process.env.LOG_FILE_PATH || config.get('logging.base_path') + config.get('logging.detault_file')))
// }

const appLogger = {}
const pinoInstance = (channel) => {    
    if (channel) {
        channel = channel.toUpperCase()
        if (appLogger[channel]) {
            return appLogger[channel]
        } else {
            const childLogger = pino(options, pino.destination(config.get('logging.base_path') + channel + '.log'))
            appLogger[channel] = childLogger
            return childLogger            
        }
    } else {
        const serverLog = config.get('logging.detault_file')
        if (appLogger[serverLog]) {
            return appLogger[serverLog]
        } else {
            const parentLogger = pino(options, pino.destination(process.env.LOG_FILE_PATH || config.get('logging.base_path') + serverLog))
            appLogger[serverLog] = parentLogger
            return parentLogger

        }
    }
}

const pinoChildInstance = (channel, properties = { reqId: '' }) => {
    return pinoInstance(channel).child(properties)
}

module.exports = {
    pinoInstance: pinoInstance,
    pinoChildInstance: pinoChildInstance
}

/** Multi Stream Code */

// const fs = require('fs');
// const pinoms = require('pino-multi-stream');
// const ErrorWriteStream = require('../logger/errorWriteStream');

// const fsStream = new ErrorWriteStream('logs/error.log');

// const loggerMap = {
//   'CRPL': fs.createWriteStream('logs/CRPL.log'),
//   'channelId2': fs.createWriteStream('logs/channelId2.log'),
// }

// const streams = (channelId) => {
//   console.log(channelId, 'in streams...');
//   if (loggerMap[channelId]) {
//     console.log(channelId, 'in streams...found channel');
//     return [
//       { stream: loggerMap[channelId] },
//       { level: 'error', stream: fsStream },
//       { level: 'fatal', stream: fsStream }
//     ];
//   }
//   console.log(channelId, 'in streams...not found channel');
//   return [
//     { stream: fs.createWriteStream(process.env.LOG_FILE_PATH || 'logs/server.log') },
//     { level: 'error', stream: fsStream },
//     { level: 'fatal', stream: fsStream }
//   ];
// };

// const pinoInstance = (channelId) => {
//   console.log(channelId, 'in pino instance...');
//   const strm = streams(channelId);
//   return pinoms({ strm, options });
// };

// module.exports = (channelId) => {
//   console.log(channelId, 'in export...');
//   return pinoInstance(channelId);
// }