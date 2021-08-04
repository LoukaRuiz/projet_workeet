import { UserClient } from "./clients/userClient";
let token;
const userClient = new UserClient(process.env.REACT_APP_ApiBaseUrl, token);
console.log(process.env.REACT_APP_ApiBaseUrl)
// USER API
export const createUser = async (user) => {
    return await userClient.post(user);
}

export const getUser = async (userId) => {
    return await userClient.get(userId)
}

export const getUserByEmail = async (email) => {
    return await userClient.getByEmail(email)
}

export const getUsers = async (projectId) => {
    return await userClient.getUsers(projectId)
}

export const updateUser = async (userId, user) => {
    return await userClient.put(userId, user);
}

export const deleteUser = async (userId) => {
    return await userClient.delete(userId);
}
