import {describe} from "node:test";
import {deleteTestUser, testUser} from "./hooks";

import {createUser, getUserByEmail, updateUserById} from "../services/user.service";
import {ActivityLevel, Goal, UpdateUser} from "../types/user";

beforeAll(async () => {
    await createUser(testUser);
});

describe('User', () => {
    it('should update the existing user', async () => {
        const user = await getUserByEmail(testUser.email);
        if (user) {
            const dataToUpdate: UpdateUser = {
                height: 176,
                birth_date: new Date("1999-01-01"),
                goal: Goal.GAIN,
                activity_level: ActivityLevel.ACTIVE
            }
            await updateUserById(user.id, dataToUpdate);
        }
        const updatedUser = await getUserByEmail(testUser.email);
        expect(updatedUser?.height).toBe(176);
    });
});

afterAll(async () => {
    await deleteTestUser()
})