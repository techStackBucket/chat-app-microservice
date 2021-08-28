const jwt = require('jsonwebtoken');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = verifyAuthorization;

 async function verifyAuthorization (req, res, next) {
    const accessToken = req.headers['x-access-token'];
    if(accessToken === null || accessToken === undefined){
        return res.status(403).json({ error: "Not Authorizated" });
    }

    try {
        const payload = jwt.verify(accessToken, config.secret);
        if(!await userService.getByUserId(payload.userId)){
            return res.status(403).json({ error: "Not Authorizated" });
        }
            
    } catch (err) {
        return res.status(401).send("Invalid Token");
    } 

    return next();
}