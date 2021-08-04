import axios from 'axios';
import Workspace from '../../models/Workspace';

export class WorkspaceClient {
    instance;
    baseUrl;
    headers_;

    constructor(baseUrl, instance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl ? baseUrl : "";
        this.headers_ = {
            "Content-Type" : "application/json"
        }
    }

    get(userId, workspaceId) {
        let url_ = this.baseUrl + `/api/users/${userId}/workspaces/${workspaceId}`;

        let options_ = {
            method: "GET",
            url: url_,
            headers: this.headers_
        };

        return this.instance.request(options_).then((_response) => {
            return this.processGet(_response);
        }).catch(error => {
             return this.processGet(error.response);
        })
    }

    processGet(response) {
        const status = response.status;
        
        if (status === 200) {
            const _response = response.data;
            const user = Workspace.fromJS(_response);
            return user;
        } else if (status !== 200) {
            return Promise.resolve({ status, message: response.data.error })
        }

        return Promise.resolve(null);
    }

    getWorkspaces(userId) {
        let url_ = this.baseUrl + `/api/users/${userId}/workspaces`;

        let options_ = {
            method: "GET",
            url: url_,
            headers: this.headers_
        };

        return this.instance.request(options_).then((_response) => {
            return this.processGetAll(_response);
        }).catch(error => {
            return this.processGetAll(error.response);
        })
    }

    processGetAll(response) {
        const status = response.status;

        if (status === 200) {
            const _response = response.data;
            if (Array.isArray(_response)) {
                let workspaces = _response.map((item) => Workspace.fromJS(item));
                return workspaces;
            }
        } else if (status !== 200) {
            return Promise.resolve({ status, message: response.data.error })
        }

        return Promise.resolve(null);
    }

    post(userId, Workspace) {
        let url_ = this.baseUrl + `/api/users/${userId}/workspaces`;
  
        const content_ = JSON.stringify(Workspace);

        let options_ ={
            method: "POST",
            url: url_,
            headers: this.headers_,
            data: content_
        };

        return this.instance.request(options_).then((_response) => {
            return this.processPost(_response);
        }).catch(error => {
             return this.processPost(error.response);
        })
    }

    processPost(response){
        const status = response.status;

        if (status === 201) {
            const newWorkspace = response.data;
            return Workspace.fromJS(newWorkspace);
        } else if (status !== 201) {
            return Promise.resolve({ status })
        }

        return Promise.resolve(null);
    }

    put(userId, workspaceId, Workspace) {
        let url_ = this.baseUrl + `/api/users/${userId}/workspaces/${workspaceId}`;

        const content_ = JSON.stringify(Workspace);

        let options_ = {
            method: "PUT",
            url: url_,
            headers: this.headers_,
            data: content_
        } ;
        return this.instance.request(options_).then((_response) => {
            return this.processPatch(_response);
        }).catch(error => {
            return this.processPatch(error.response);
        })
    }

    processPatch(response) {
        const status = response.status;
        
        if (status !== 204) {
            return Promise.resolve({ status })
        }

        return Promise.resolve(null);
    }

    delete(userId, workspaceId){
        let url_ = this.baseUrl + `/api/users/${userId}/workspaces/${workspaceId}`;

        let options_ = {
            method: "DELETE",
            url: url_,
            headers: this.headers_
        };

        return this.instance.request(options_).then((_response) => {
            return this.processDelete(_response);
        }).catch(error => {
            return this.processDelete(error.response);
        })
    }

    processDelete(response){
        const status = response.status;

        if (status !== 204) {
            return Promise.resolve({ status })
        }

        return Promise.resolve(null);
    }
}