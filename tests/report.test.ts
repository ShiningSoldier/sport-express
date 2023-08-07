import {Report} from "../types/report";
import {getReportDataById, storeReport} from "../services/report.service";
import prisma from "../client";

describe('Report', () => {
    it('should create a report', async () => {
        const testReport: Report = {
            user_id: 1,
            date: new Date("2021-01-01"),
            weight: 80,
            leg: 50,
            waist: 90,
            chest: 100,
            arm: 30,
            photo_front: "front.jpg",
            photo_back: "back.jpg",
        }

        await storeReport(testReport)
        const report = await getReportDataById(1);
        expect(report).toEqual(testReport);
    });
});

afterAll(async () => {
    await prisma.reports.delete({
        where: {
            id: 1
        }
    })
})