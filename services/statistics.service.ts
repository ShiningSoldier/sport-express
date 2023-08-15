import {StatisticsPeriod} from "../types/statistics";

export const getStatisticsStartDate = (period: StatisticsPeriod): string => {
    const currentDate = new Date();
    let startDate = new Date();
    switch (period) {
        case 'week':
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
            break;
        case 'month':
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
            break;
        case 'year':
            startDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
            break;
    }

    return startDate.toISOString();
}