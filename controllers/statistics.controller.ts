import {Request, Response} from "express";
import {getStatisticsStartDate} from "../services/statistics.service";
import {StatisticsPeriod} from "../types/statistics";
import {getReportsByDate} from "../services/report.service";

export const getStatistics = async (req: Request, res: Response) => {
    try {
        const {id} = req.body;
        const {period} = req.params;
        const statisticsDates = getStatisticsStartDate(period as StatisticsPeriod);
        const statistics = await getReportsByDate(
            statisticsDates,
            new Date().toISOString(),
            Number(id));
        return res.status(200).json(statistics);
    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }
}
