import { UserTaskClient } from './clients/userTaskClient'
let token;
const userTaskClient = new UserTaskClient(process.env.REACT_APP_ApiBaseUrl, token);

// USER TASK API
export const createUserTask = async (userId, taskId) => {
    return await userTaskClient.post(userId, taskId);
}

export const getUserTask = async (userId, taskId) => {
    return await userTaskClient.get(userId, taskId)
}

export const updateUserTask = async (userId, taskId) => {
    return await userTaskClient.put(userId, taskId);
}

export const deleteUserTask = async (userId, taskId) => {
    return await userTaskClient.delete(userId, taskId);
}
