import * as React from 'react'
import Project from '../../models/Project'
import Workspace from '../../models/Workspace'
import { fetchKeycloak } from '../../services/services'
import { getUserByEmail } from '../../Api/apiUser'
import { createWorkspace, getWorkspace } from '../../Api/apiWorkspaces'
import { createProject } from '../../Api/apiProject'

class Init extends React.Component {

    componentDidMount = () => {
        this.fetchuserByEmail()
    }

    fetchuserByEmail = async () => {
        let { email_user } = await fetchKeycloak()

        if(email_user) {
            let user = await getUserByEmail(email_user)
            if (user.id) {
                if(user.Workspace){
                    let workspace = await getWorkspace(user.id, user.Workspace.id)
                    if (workspace.id) {
                        window.location.href = `/workspace/${workspace.id}`
                    }
                } else {
                    let newWorkspace = await createWorkspace(user.id, Workspace.fromJS({ name: "myWorkeet", UserId: user.id, createdBy: email_user }))                    
                    await createProject(user.id, Project.fromJS({ name: "Mon premier projet", createdBy: email_user }))
                    window.location.href = `/workspace/${newWorkspace.id}`
                }
            } else {

                window.location.href = "/new/username"
            }
        }
    }

    render() {
        return (<></>)
    }
}

export default Init;