import { OK, ERROR_CLIENT, ERROR_SERVER } from '../http/status';
import User_Project from '../models/user_project'
import { ModelService } from '../services/modelService'
import Project from '../models/project'
import User from '../models/user';
const projectService = new ModelService(Project)
const userService = new ModelService(User)
const userProjectService = new ModelService(User_Project)

export const AddAsync = async (req,  res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        const newUserProject = await projectService.verify(req.body.ProjectId)
        if (newUserProject.exists){
            let new_user_project = await userProjectService.AddAsync({ UserId: req.body.UserId, ProjectId: newUserProject.data.id, isAdmin: req.body.isAdmin })
            if (new_user_project.isAdded){
                res.status(OK.Status201).send(new_user_project.data)
            }
        }else{
            res.status(ERROR_CLIENT.Status400).send({ error: newUserProject.message })
        } 
    } else {
        res.status(ERROR_CLIENT.Status400).send({ error: user.message })
    } 
}

export const DeleteAsync = async (req, res) => {
    let user_project = await userProjectService.verify(req.params.userProjectId)
    if (user_project.exists) {
        let userProjectToDelete = await userProjectService.deleteAsync(user_project.data.id)
        if (userProjectToDelete.isDelete) {
            res.status(OK.Status204).send();
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: projectToDelete.message })
        }     
    }else{
        res.status(ERROR_SERVER.Status500).send({ error: user.message })
    }
}
