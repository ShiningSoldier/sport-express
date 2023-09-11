export type Exercise = {
    id?: number;
    user_id: number;
    day_number: number;
    name: string;
    sets: number;
    reps: number;
    min_weight: number;
    max_weight: number;
}