export enum Goal {
    LOSE = "lose",
    MAINTAIN = "maintain",
    GAIN = "gain"
}

export enum ActivityLevel {
    SEDENTARY = "sedentary",
    LIGHT = "light",
    MODERATE = "moderate",
    ACTIVE = "active",
    VERY_ACTIVE = "very active"
}

export interface BasicUser {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface User extends BasicUser {
    height: number;
    birth_date: Date;
    goal: Goal;
    activity_level: ActivityLevel;
}

export interface UpdateUser {
    height: number,
    birth_date: Date,
    goal: Goal,
    activity_level: ActivityLevel
}