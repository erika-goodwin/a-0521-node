const {
  signup,
  requestResetPassword,
  resetPassword,
} = require("../middleware/auth.service");

const signUpController = async (req, res, next) => {
    console.log(req);
  const signUpService = await signup(req.body);
  return res.json(signUpService);
};

const resetPasswordRequestController = async (req, res, next) => {
  const requetPasswordResetService = await requestResetPassword(req.body.email);
  return res.json(requetPasswordResetService);
};

const resetPasswordController = async (req, res, next) => {
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};

module.exports = {
  signUpController,
  resetPasswordRequestController,
  resetPasswordController,
};
