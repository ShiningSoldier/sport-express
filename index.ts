import express, {NextFunction} from 'express';
const app = express();
import cors from 'cors';
import authRouter from './routes/auth.router';
import userRouter from "./routes/user.router";
import reportRouter from "./routes/report.router";
import statisticsRouter from "./routes/statistics.router";
import cookieParser from 'cookie-parser';
import {Request, Response} from "express";
import "dotenv/config";

app.use(cors({
    origin: 'http://127.0.0.1:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'))
app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/report', reportRouter);
app.use('/statistics', statisticsRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})