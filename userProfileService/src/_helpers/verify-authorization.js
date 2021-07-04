module.exports = verifyAuthorization;

function verifyAuthorization (req, res, next) {
    const userId = req.headers['user-id'];
    if(userId === null || userId === undefined)
        return res.status(403).json({ error: "Not Authorizated" });
    else
        next()
}