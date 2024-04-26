const passport = require("passport")

exports.authJwt = (req, res, next) => {
    passport.authenticate('jwt', { session: false })(req, res, next);
};

exports.authAdmin = async (req, res, next) => {
    if (!req.user || !req.user.isAdmin) return res.status(401).json({ error: "Unauthorized: User does not have admin status." })
    next()
};

