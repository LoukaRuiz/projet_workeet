import ServiceKeycloak from "./keycloak";
import { getUser, getUserByEmail } from '../Api/apiUser'
import { getWorkspace} from '../Api/apiWorkspaces'
import { getProjects } from "../Api/apiProject";

export const loadProjects = async (userId) => {
    let projects = await getProjects(userId);
    return { projects, projectSelected: projects[0] }
}

export const loadUser = async () => {
    let workspaceId = window.location.href.split("/")[4]
    let userId = localStorage.getItem("userId")
    let user = await getUser(userId)
    let workspace = await getWorkspace(user.id, workspaceId)

    return { isAdmin: user.id === workspace.UserId, user }
}

export const loadUserByEmail = async (email) => {
    let user = await getUserByEmail(email)
    if(user.id) {
        return user
    } else {
        return null
    }
}

export const fetchKeycloak = async () => {
    let auth = {}
    auth = new ServiceKeycloak();
    await auth.init();
    auth.userinfo = await auth.keycloakAuth.loadUserInfo()
    if (auth.userinfo.email_verified) {
        return { email_user: auth.userinfo.email }
    } else {
        return null
    }
}
