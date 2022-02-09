const {
  signin,
  signup,
  requestResetPassword,
  resetPassword,
} = require("../middleware/auth.service");

const signInController = async (req, res, next) => {
  const signInService = await signin(req.body.email, req.body.password);
  return res.json(signInService);
}

const signUpController = async (req, res, next) => {
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
  signInController,
  signUpController,
  resetPasswordRequestController,
  resetPasswordController,
};
