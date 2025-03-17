const express = require('express')
const config = require('./config/default.json')
const https = require('https')
const fs = require('fs')
const expressPino = require('express-pino-logger')
const api = require('./routes/index')
const app = express()
const { performance, PerformanceObserver } = require('perf_hooks')
// const ClinicDoctor = require('@clinic/doctor')
const logger = require('./common/utils/logger/logger').pinoInstance()
const expressLogger = expressPino({ logger })
process.env.UV_THREADPOOL_SIZE = 15 + 4

const SERVICE_PORT = config.PORT | process.env.PORT
const SERVICE_PORTHTTPS = config.PORTHTTPS

app.use(expressLogger)
app.use(express.json())
app.use('/api', api)

// Fallback to this if no request found
app.use((req, res) => {
    res.sendStatus(404)
})

const options = {
    cert: fs.readFileSync('./certificate/certificate.crt', 'utf8'),
    key: fs.readFileSync('./certificate/privateKey.key', 'utf8')
}


const perfObserver = new PerformanceObserver((items) => {

    items.getEntries().forEach((entry) => {

        console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);

    });

    performance.clearMarks();

});

perfObserver.observe({ entryTypes: ['measure'], buffered: true });
// console.log('asss')
//const server = https.createServer(options, app).listen(SERVICE_PORT)
const server = app.listen(SERVICE_PORT, function () {
    const port = server.address().port
    console.log("HTTP server started on ", port);

});


const serverhttps = https.createServer(options, app).listen(SERVICE_PORTHTTPS, function () {
    const port = serverhttps.address().port
    console.log("HTTPS server started on ", port);

});







process.on('uncaughtException', (err) => {
    console.log(err, 'uncaughtException')
    logger.error(err.stack)

});
process.on('exit', (err) => {
    console.log(err, 'exit')
    logger.error(err.stack)
});

