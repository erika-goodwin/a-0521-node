const router = require("express").Router();

const {
  signInController,
  signUpController,
  resetPasswordRequestController,
  resetPasswordController,
} = require("../controllers/auth");

router.post("/auth/signin", signInController);
router.post("/auth/signup", signUpController);
router.post("/auth/requestResetPassword", resetPasswordRequestController);
router.post("/auth/resetPassword", resetPasswordController);

module.exports = router;
