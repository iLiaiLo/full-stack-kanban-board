import express from "express";
import signup from "../../controllers/authControllers/signup.js";
import login from "../../controllers/authControllers/login.js";
import logout from "../../controllers/authControllers/logout.js";
import validateSignup from "../../middlewares/validation/auth/validateSignup.js";
const authRouter = express.Router();

authRouter.post("/signup", validateSignup, signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
