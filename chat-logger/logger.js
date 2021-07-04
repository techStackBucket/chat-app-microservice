module.exports = Logger
let bunyan = require('bunyan');
let seq = require('bunyan-seq');
var log;
function Logger(option){
    log = bunyan.createLogger({
        name: option.name,
        streams: [
            {
                stream: process.stdout,
                level: option.level,
            },
            seq.createStream({
                serverUrl: option.seqServerUrl,
                level: option.seqLevel
            })
        ]
    });
    
    return {
        info,
        error,
        fatal
    }
}

function info(msg){
    log.info(msg);
}

function error(msg){
    log.error(msg);
}

function fatal(msg){
    log.fatal(msg);
}