import {BasicUser, UpdateUser, User} from "../types/user";
import prisma from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

type userToStore = Omit<BasicUser, "id">;

export const createUser = async (newUser: userToStore) => {
    const userExists = await getUserByEmail(newUser.email);
    if (userExists) {
        throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(newUser.password);
    return storeUser(newUser.name, newUser.email, hashedPassword);
}

export const logInUser = async (email: string, password: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error("User does not exist");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("Invalid password");
    }
    return await generateToken(user);
}

export const getUserById = async (id: number) => {
    return prisma.users.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            email: true,
            height: true,
            birth_date: true,
            goal: true,
            activity_level: true
        }
    })
}

export const updateUserById = async (id: number, updatedUserData: UpdateUser) => {
    console.log(updatedUserData.birth_date)
    await prisma.users.update({
        where: {
            id: id
        },
        data: {
            height: updatedUserData.height,
            birth_date: updatedUserData.birth_date,
            goal: updatedUserData.goal,
            activity_level: updatedUserData.activity_level
        }
    })
}

export const getUserByEmail = async (email: string) => {
    return prisma.users.findUnique({
        where: {
            email: email
        }
    })
}

export const deleteUserById = async (id: number) => {
    await prisma.users.delete({
        where: {
            id: id
        }
    })
}

const hashPassword = async (rawPassword: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(rawPassword, salt);
}

const storeUser = async (name: string, email: string, password: string) => {
    await prisma.users.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    })
}

const generateToken = async (user: BasicUser) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}