import { OK, ERROR_CLIENT, ERROR_SERVER } from '../http/status';
import { ModelService } from '../services/modelService'
import User from '../models/user';
import Workspace from '../models/workspace'
const workspaceService = new ModelService(Workspace)
const userService = new ModelService(User)

export const GetByIdAsync = async (req, res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        let workspaces = await workspaceService.verify(req.params.workspaceId, User)
        if(workspaces.exists){
            res.status(OK.Status200).send(workspaces.data)      
        }else{
            res.status(ERROR_CLIENT.Status404).send({ error: workspaces.message})
        }
    } else {
        res.status(ERROR_CLIENT.Status404).send({ error: user.message });
    }
}

export const GetAllAsync = async (req, res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        const all = await Workspace.findAll({ where: { isDeleted: false, UserId: req.params.userId } });
        if (all) {
            return res.status(OK.Status200).send(all)
        } else {
            res.status(ERROR_CLIENT.Status404).send({ message: `${Workspace.toString()} not found` });
        }
    } else {
        res.status(ERROR_SERVER.Status500).send({ error: user.message })
    }
}

export const AddAsync = async (req,  res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        const workspace = await workspaceService.verify(req.body.id)
        if (!workspace.exists) {
            const newWorkspace = await workspaceService.AddAsync(req.body)
            if (newWorkspace.isAdded){
                res.status(OK.Status201).send(newWorkspace.data) 
            }else{
                res.status(ERROR_CLIENT.Status400).send({ error: newWorkspace.message })
            }
        }
    } else {
        res.status(ERROR_CLIENT.Status400).send({ error: user.message })
    }
}

export const UpdatedAsync = async (req, res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        let workspaceToUpdate = await workspaceService.updateAsync(req.params.workspaceId, req.body)
        if (workspaceToUpdate.isUpdated) {
            res.status(OK.Status204).send();
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: workspaceToUpdate.message })
        }
    } else {
        res.status(ERROR_CLIENT.Status400).send({ error: user.message })
    }
}

export const DeleteAsync = async (req, res) => {
    let user = await userService.verify(req.params.userId)
    if (user.exists) {
        let workspaceToDelete = await workspaceService.deleteAsync(req.params.workspaceId)
        if (workspaceToDelete.isDelete) {
            res.status(OK.Status204).send();
        } else {
            res.status(ERROR_CLIENT.Status400).send({ error: workspaceToDelete.message })
        }    
    }else{
        res.status(ERROR_CLIENT.Status400).send({ error: user.message })
    }
}
