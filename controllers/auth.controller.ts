import {Request, Response} from "express";
import {createUser, logInUser} from "../services/user.service";

const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        await createUser({ name, email, password })
        return res.json({ message: "User created" });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await logInUser(email, password);
        return res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            sameSite: "none",
            secure: true,
        }).json({ message: "Logged in" });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export { register, login }