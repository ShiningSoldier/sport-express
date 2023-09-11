import {Request, Response} from 'express';
import {getExercisesByDay, storeExercise} from "../services/exercises.service";
import {Exercise} from "../types/exercises";

export const getUserExercisesByDay = async (req: Request, res: Response) => {
    try {
        const {id, dayNumber} = req.body;
        const exercises = await getExercisesByDay(id, dayNumber);
        res.status(200).json(exercises);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export const storeUserExercise = async (req: Request, res: Response) => {
    try {
        const exercise: Exercise = {
            user_id: req.body.id,
            day_number: parseInt(req.body.day_number),
            name: req.body.name,
            sets: parseInt(req.body.sets),
            reps: parseInt(req.body.reps),
            min_weight: parseInt(req.body.min_weight),
            max_weight: parseInt(req.body.max_weight),
        }
        await storeExercise(exercise);
        res.status(200).json({message: "Exercise stored successfully!"});
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}