import { TaskClient } from './clients/taskClient'
let token;
const taskClient = new TaskClient(process.env.REACT_APP_ApiBaseUrl, token);

//TASK API
export const createTask = async (projectId, task) => {
    return await taskClient.post(projectId, task);
}
export const getTask = async (projectId, taskId) => {
    return await taskClient.get(projectId, taskId)
}
export const getTasks = async (projectId) => {
    return await taskClient.getTasks(projectId)
}
export const updateTask = async (projectId, taskId, task) => {
    return await taskClient.put(projectId, taskId, task);
}
export const deleteTask = async (projectId, taskId) => {
    return await taskClient.delete(projectId, taskId);
}
