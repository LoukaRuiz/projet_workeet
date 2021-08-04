import { UserProjectClient } from './clients/userProjectClient'
let token;
const userProjectClient = new UserProjectClient(process.env.REACT_APP_ApiBaseUrl, token);

// USER PROJECT API
export const createUserProject = async (userId, projectId, isAdmin) => {
    return await userProjectClient.post(userId, projectId, isAdmin);
}

export const getUserProject = async (userId, projectId) => {
    return await userProjectClient.get(userId, projectId)
}

export const updateUserProject = async (userId, projectId, isAdmin) => {
    return await userProjectClient.put(userId, projectId, isAdmin);
}

export const deleteUserProject = async (userId, projectId) => {
    return await userProjectClient.delete(userId, projectId);
}
