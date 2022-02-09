const passport = require('passport')
const jwt = require('jsonwebtoken')
const dev = process.env.NODE_ENV !== 'production'

//For creating the refresh token cookie
exports.COOKIE_OPTIONS = {
    httpOnly : true,
    secure: !dev,
    sighed: true,
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY),
    sameSite: 'none'
}

//to crete the JWT
exports.getToken = user => {
    return jwt.sign(user, process.env.JWT_SECRET,{
        expiresIn: eval(process.env.SESSION_EXPIRY)
    })
}

exports.getRefreshToken = user => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: eval(process.env.SESSION_EXPIRY)
    })
    return refreshToken
}

//to be called for every authenticated request
exports.verifyUser = passport.authenticate('jwt', {session: false})