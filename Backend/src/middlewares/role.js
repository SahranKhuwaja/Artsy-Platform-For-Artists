const role = async (req, res, next) => {
    try {
        if (req.user.Role !== 'Artist') {
            return res.send(false);
        }
        next();
    } catch (e) {
        console.log(e)
    }
}

module.exports = role;