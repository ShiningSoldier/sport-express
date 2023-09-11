import express from "express";
const exerciseRouter = express.Router();
import {checkUserAuthenticated} from "../middlewares/auth.middleware";
import {getUserExercisesByDay, storeUserExercise} from "../controllers/exercises.controller";

exerciseRouter.post("/", checkUserAuthenticated, getUserExercisesByDay)
exerciseRouter.post("/add", checkUserAuthenticated, storeUserExercise)
export default exerciseRouter;