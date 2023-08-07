import {describe} from "node:test";
import {createUser, deleteUserById, getUserByEmail, logInUser} from "../services/user.service";
import {deleteTestUser} from "./hooks";
import {testUser} from "./hooks";

beforeAll(async () => {
    await createUser(testUser);
});

describe('Authentication',() => {
    it('should log in user', async () => {
        const token = await logInUser(testUser.email, testUser.password);
        expect(token).toBeTruthy();
    });
});

afterAll(async () => {
    await deleteTestUser()
})