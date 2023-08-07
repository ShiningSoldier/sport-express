import {Request, Response} from "express";
import {
    checkReportExists,
    getReportDataById,
    prepareReportData,
    storeReport,
    storeReportPhotos,
    getReportsByDate, getDatesRange, deleteReportFromDb, deleteReportPhotos,
} from "../services/report.service";
import {BasicReport, Report, ReportPhotoFiles} from "../types/report";

const getReports = async (req: Request, res: Response) => {
    try {
        const {date} = req.params;
        const {id} = req.body;
        const reportDates = getDatesRange(date);
        const reports = await getReportsByDate(
            reportDates.startDate,
            reportDates.endDate,
            Number(id)
        );
        res.json(reports);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

const getReportById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const report = await getReportDataById(Number(id));

        return res.status(200).json(report);
    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }
}

const createReport = async (req: Request, res: Response) => {
    try {
        const {id} = req.body;
        const newReport: BasicReport = req.body;
        newReport.user_id = id;
        const photos = req.files as ReportPhotoFiles;
        await checkReportExists(newReport.user_id, newReport.date as string);
        const photoNames = await storeReportPhotos(newReport, photos)
        const newReportData: Report = prepareReportData(newReport, photoNames);
        await storeReport(newReportData)

        return res.status(201).json({message: "Report created successfully"});
    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }
}

export const deleteReport = async (req: Request, res: Response) => {
    try {
        const {reportId} = req.params;
        const {id} = req.body;
        const report = await getReportDataById(parseInt(reportId));
        if (report) {
            await deleteReportPhotos(report as Report)
            await deleteReportFromDb(parseInt(reportId), id);
        }
        return res.status(200).json({message: "Report deleted successfully"});

    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }

}

export {getReports, createReport, getReportById}