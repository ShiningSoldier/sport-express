import express from "express";
import {getUser, updateUser} from "../controllers/user.controller";
import {checkUserAuthenticated} from "../middlewares/auth.middleware";
import {body} from "express-validator";
import {ActivityLevel, Goal} from "../types/user";

const userRouter = express.Router();

userRouter.get("/", checkUserAuthenticated, getUser)
userRouter.post(
    "/update",
    checkUserAuthenticated,
    body('height').optional().default(null).customSanitizer((value) => {
        return value ? parseFloat(value) : value;
    }).isNumeric().withMessage('Height must be a number'),
    body('birth_date').optional().default(null).isDate().withMessage('Birth date must be a date'),
    body('goal').isIn(Object.keys(Goal)).withMessage('Goal must be one of lose, maintain or gain'),
    body('activity_level').isIn(Object.keys(ActivityLevel)).withMessage('Activity level must be one of sedentary, light, moderate, active or very active'),
    updateUser
)

export default userRouter;