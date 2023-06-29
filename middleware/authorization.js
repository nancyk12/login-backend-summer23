const verifyToken = async (req, res, next) => {
    console.log("Middleware!!!!")
    next()
}

module.exports = { verifyToken }