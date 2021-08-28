const LogLib = require("chat-logger");

module.exports = LogLib({
    name:"userProfileServie",
    level:"warn",
    seqLevel:process.env.SEQ_LEVEL,
    seqServerUrl:process.env.SEQ_SERVER_URL
});

