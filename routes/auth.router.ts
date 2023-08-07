import express from "express";
import {register, login} from "../controllers/auth.controller";
const authRouter=  express.Router();
import {query} from "express-validator";

authRouter.post("/register",
    query("email").isEmail(),
    query("password").isLength({min: 6}),
    register
);
authRouter.post("/login", login);

export default authRouter;