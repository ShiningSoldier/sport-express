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
    gender: string;
    height: number;
    birth_date: string;
    goal: Goal;
    activity_level: ActivityLevel;
}

export interface AdditionalUserData {
    gender: string,
    height: number,
    birth_date: string,
    goal: Goal,
    activity_level: ActivityLevel,
}