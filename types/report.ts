export interface BasicReport {
    id?: number;
    user_id: number;
    date: string;
    weight: number;
    leg: number;
    waist: number;
    chest: number;
    arm: number;
}

export interface Report extends BasicReport {
    photo_front: string;
    photo_back: string;
}

export type ReportPhotoFiles = {[p: string]: Express.Multer.File[]} | undefined;

export type ReportPhotoNames = {photo_front: string, photo_back: string};

export type ReportDates = {
    startDate: string,
    endDate: string
}