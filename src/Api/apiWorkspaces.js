import { WorkspaceClient } from './clients/workspaceClient'
let token;
const workspaceClient = new WorkspaceClient(process.env.REACT_APP_ApiBaseUrl, token);

//WORKSPACE API 
export const createWorkspace = async (userId, workspace) => {
    return await workspaceClient.post(userId, workspace);
}

export const getWorkspace = async (userId, workspaceId) => {
    return await workspaceClient.get(userId, workspaceId)
}

export const updateWorkspace = async (userId, workspaceId, workspace) => {
    return await workspaceClient.put(userId, workspaceId, workspace);
}

export const deleteworkspace = async (userId, workspaceId) => {
    return await workspaceClient.delete(userId, workspaceId);
}