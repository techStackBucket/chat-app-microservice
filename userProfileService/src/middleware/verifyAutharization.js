module.exports = function (req, res, next) {
    const userId = req.headers['user-id'];
    if(userId === null || userId === undefined)
        return res.status(403).json({ error: "not authorizated" });
    else
        next()
}