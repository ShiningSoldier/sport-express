import {BasicUser} from "../types/user";
import {deleteUserById, getUserByEmail} from "../services/user.service";

const testUser: BasicUser = {
    name: 'Test',
    email: 'test@test.com',
    password: 'testtesttest',
}

const deleteTestUser = async () => {
    const user = await getUserByEmail(testUser.email);
    if (user) {
        await deleteUserById(user.id)
    }
}

export {testUser, deleteTestUser}