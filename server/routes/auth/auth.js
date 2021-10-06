import express from "express";

//components


const authRouter = express.Router();

authRouter.route("/register").post();

authRouter.route("/login").post();

authRouter.route("/forgotpassword").post();

authRouter.route("/resetpassword/").post();

export default authRouter;