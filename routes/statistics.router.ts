import express from "express";
import {getStatistics} from "../controllers/statistics.controller";
import {checkUserAuthenticated} from "../middlewares/auth.middleware";
const statisticsRouter = express.Router();

statisticsRouter.get("/:period", checkUserAuthenticated, getStatistics);

export default statisticsRouter;