import express from "express";
import {getReports, createReport, getReportById, deleteReport} from "../controllers/report.controller";
const reportRouter = express.Router();
import multer from "multer";
import {checkUserAuthenticated} from "../middlewares/auth.middleware";
import {body} from "express-validator";
const upload = multer();


reportRouter.get("/:date", checkUserAuthenticated, getReports)
reportRouter.get("/view/:id", getReportById)
reportRouter.post(
    "/create",
    upload.fields([
    {name: 'photo_front', maxCount: 1},
    {name: 'photo_back', maxCount: 1}
]),
    checkUserAuthenticated,
    body('weight').customSanitizer((value) => {
        return parseFloat(value);
        }).isNumeric().withMessage('Weight must be a number'),
    body('leg').customSanitizer((value) => {
        return parseFloat(value);
        }).isNumeric().withMessage('Leg must be a number'),
    body('waist').customSanitizer((value) => {
        return parseFloat(value);
        }).isNumeric().withMessage('Waist must be a number'),
    body('chest').customSanitizer((value) => {
        return parseFloat(value);
        }).isNumeric().withMessage('Chest must be a number'),
    body('arm').customSanitizer((value) => {
        return parseFloat(value);
        }).isNumeric().withMessage('Arm must be a number'),
    createReport
)
reportRouter.delete("/:reportId", checkUserAuthenticated, deleteReport)

export default reportRouter;