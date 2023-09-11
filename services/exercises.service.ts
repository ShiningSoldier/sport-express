import prisma from "../client";
import {Exercise} from "../types/exercises";

export const getExercisesByDay = async (userId: number, day: number) => {
    return prisma.exercise.findMany({
        where: {
            user_id: userId,
            day_number: day
        }
    })
}

export const storeExercise = async (exercise: Exercise) => {
    return prisma.exercise.create({
        data: {
            user_id: exercise.user_id,
            day_number: exercise.day_number,
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            min_weight: exercise.min_weight,
            max_weight: exercise.max_weight,
        }
    })
}