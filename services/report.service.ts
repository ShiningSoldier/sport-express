import {BasicReport, Report, ReportDates, ReportPhotoFiles, ReportPhotoNames} from "../types/report";
import prisma from "../client";
import path from "path";
import fs from "fs/promises";

const getReportsByDate = async (startDate: string, endDate: string, userId: number) => {
    const reports = await prisma.reports.findMany({
        where: {
            user_id: userId,
            date: {
                gte: startDate,
                lte: endDate
            }
        }
    });

    return reports.map(report => {
        return {
            ...report,
            date: convertDate(report.date)
        }
    });
}

const getReportDataById = async (id: number) => {
    return prisma.reports.findUnique({
        where: {
            id
        }
    });
}

const convertDate = (rawDate: Date) => {
    return new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(rawDate);
}

const checkReportExists = async (userId: number, reportDate: string) => {
    const date = new Date(reportDate).toISOString();
    const reportExists = await prisma.reports.findFirst({
        where: {
            user_id: userId,
            date: date
        }
    });
    if (reportExists) throw new Error("Report for this date already exists");
}

const storeReportPhotos = async (reportData: BasicReport, reportPhotos: ReportPhotoFiles): Promise<ReportPhotoNames> => {
    if (!reportPhotos) {
        throw new Error("No photos were uploaded");
    }
    const pathToStore = await getPathToPhotos(reportData.user_id, String(reportData.date));
    const newFrontPhotoName = `${reportData.date}_front.jpg`;
    const newBackPhotoName = `${reportData.date}_back.jpg`;
    await Promise.all([
        savePhotos(reportPhotos.photo_front[0], newFrontPhotoName, pathToStore),
        savePhotos(reportPhotos.photo_back[0], newBackPhotoName, pathToStore)
    ]);
    return {photo_front: newFrontPhotoName, photo_back: newBackPhotoName};
}

const prepareReportData = (reportData: BasicReport, reportPhotos: ReportPhotoNames): Report => {
    return {
        ...reportData,
        photo_front: reportPhotos.photo_front,
        photo_back: reportPhotos.photo_back
    }
}

const storeReport = async (report: Report) => {
    await prisma.reports.create({
        data: {
            user_id: report.user_id,
            date: new Date(report.date).toISOString(),
            weight: report.weight,
            leg: report.leg,
            waist: report.waist,
            chest: report.chest,
            arm: report.arm,
            photo_front: report.photo_front,
            photo_back: report.photo_back
        }
    });

}

const getPathToPhotos = async (userId: number, reportDate: string): Promise<string> => {
    const pathToUpload = path.join(__dirname, "..", "public", "uploads", `${userId}`, `${reportDate}`);
    await fs.mkdir(pathToUpload, {recursive: true});
    return pathToUpload;
}

const savePhotos = async (photo: Express.Multer.File, newName: string, pathToUpload: string) => {
    fs.writeFile(path.join(pathToUpload, newName), photo.buffer);
}

const getDatesRange = (rawStartDate: string): ReportDates => {
    const startDate = new Date(rawStartDate);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    return {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
    }
}

const deleteReportPhotos = async (reportData: Report) => {
    const date = new Date(reportData.date);
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const pathToStore = await getPathToPhotos(reportData.user_id, formattedDate);
    await fs.rm(pathToStore, {recursive: true, force: true});
}

const deleteReportFromDb = async (reportId: number, userId: number) => {
    await prisma.reports.delete({
        where: {
            id: reportId,
            user_id: userId
        }
    });
}

export {
    getReportDataById,
    checkReportExists,
    storeReportPhotos,
    storeReport,
    prepareReportData,
    getReportsByDate,
    getDatesRange,
    deleteReportPhotos,
    deleteReportFromDb
}