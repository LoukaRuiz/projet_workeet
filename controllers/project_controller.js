import { OK, ERROR_CLIENT, ERROR_SERVER } from '../http/status';
import User_Project from '../models/user_project'
import { ModelService } from '../services/modelService'
import Project from '../models/project'
import User from '../models/user';
const projectService = new ModelService(Project)
const userService = new ModelService(User)

export const GetByIdAsync = async (req, res) => {    
    let user = await userService.verify(req.params.userId)
    if (user.exists){
        let project = await projectService.verify(req.params.projectId)
        if (project.exists) {
            res.status(OK.Status200).send(project.data)        
        } else {
            res.status(ERROR_CLIENT.Status404).send({ error: project.message });
        }
    } else {
        res.status(ERROR_CLIENT.Status404).send({ error: user.message });
    }
}

export const GetAllAsync = async (req, res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        const all = await User.findOne({ where: { id: req.params.userId, isDeleted: false }, include: Project });
        if (all) {
            return res.status(OK.Status200).send(all)
        } else {
            res.status(ERROR_CLIENT.Status404).send({ message: `${Project.toString()} not found` });
        }
    } else {
        res.status(ERROR_SERVER.Status500).send({ error: user.message })
    }
}

export const AddAsync = async (req,  res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        const project = await projectService.verify(req.params.projectId)
        if (!project.exists) {
            const newProject = await projectService.AddAsync(req.body)
            if (newProject.isAdded){

                let new_user_project = User_Project.build({ UserId: req.params.userId, ProjectId: newProject.data.id, isAdmin: true })
                new_user_project.save()

                res.status(OK.Status201).send(newProject.data) 
            }else{
                res.status(ERROR_CLIENT.Status400).send({ error: newProject.message })
            }
        } 
    } else {
        res.status(ERROR_CLIENT.Status400).send({ error: user.message })
    } 
}

export const UpdatedAsync = async (req, res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        let projectToUpdate = await projectService.updateAsync(req.params.projectId, req.body)
        if (projectToUpdate.isUpdated) {
            res.status(OK.Status204).send();
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: projectToUpdate.message })
        }
    } else {
        res.status(ERROR_SERVER.Status500).send({ error: user.message })
    }
}

export const DeleteAsync = async (req, res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        let projectToDelete = await projectService.deleteAsync(req.params.projectId)
        if (projectToDelete.isDelete) {
            res.status(OK.Status204).send();
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: projectToDelete.message })
        }     
    }else{
        res.status(ERROR_SERVER.Status500).send({ error: user.message })
    }
}
