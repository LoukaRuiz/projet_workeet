import { ProjectClient } from './clients/projectClient'
let token;
const projectClient = new ProjectClient(process.env.REACT_APP_ApiBaseUrl, token);

// PROJECT API
export const createProject = async (userId, project) => {
    return await projectClient.post(userId, project);
}

export const getProject = async (userId, projectId) => {
    return await projectClient.get(userId, projectId)
}

export const getProjects = async (userId) => {
    return await projectClient.getAll(userId)
}

export const updateProject = async (userId, projectId, project) => {
    return await projectClient.put(userId, projectId, project);
}

export const deleteProject = async (userId, projectId) => {
    return await projectClient.delete(userId, projectId);
}
