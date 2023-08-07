import {Request, Response} from "express";
import {getUserById, updateUserById} from "../services/user.service";
import {User} from "../types/user";

const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const user = await getUserById(Number(id));
        return res.json(user);
    }
    catch (error: any) {
        console.log(error.stack)
        return res.status(500).json({ message: "Couldn't find the user" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUserData: User = req.body;
        await updateUserById(Number(updatedUserData.id), updatedUserData);
        return res.json({ message: "User updated" });
    } catch (error: any) {
        console.log(error.stack)
        return res.status(500).json({ message: "Couldn't update the user" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {

}

export { getUser }