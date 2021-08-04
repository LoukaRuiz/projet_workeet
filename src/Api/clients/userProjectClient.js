import axios from 'axios';
import UserProject from '../../models/User_Project';

export class UserProjectClient {
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

    get(userId, projectId) {
        let url_ = this.baseUrl + `/api/relations/users/${userId}/projects/${projectId}`;

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
            const user = UserProject.fromJS(_response);
            return user;
        } else if (status !== 200) {
            return Promise.resolve({ status, message: response.data.error })
        }

        return Promise.resolve(null);
    }

    post(userId, projectId, isAdmin) {
        let url_ = this.baseUrl + `/api/relations/users/${userId}/projects`;
        const content_ = JSON.stringify({
            UserId: userId,
            ProjectId: projectId,
            isAdmin: isAdmin
        });

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
            const newProject = response.data;
            return UserProject.fromJS(newProject);
        } else if (status !== 201) {
            return Promise.resolve({ status, message: response.data.error})
        }

        return Promise.resolve(null);
    }

    put(userId, projectId, project) {
        let url_ = this.baseUrl + `/api/relations/users/${userId}/projects/${projectId}`;

        const content_ = JSON.stringify(project);

        let options_ = {
            method: "PUT",
            url: url_,
            headers: this.headers_,
            data: content_
        } ;
        return this.instance.request(options_).then((_response) => {
            return this.processPut(_response);
        }).catch(error => {
            return this.processPut(error.response);
        })
    }

    processPut(response) {
        const status = response.status;
        if (status !== 204) {
            return Promise.resolve({ status })
        }

        return Promise.resolve(null);
    }

    delete(userId, projectId){
        let url_ = this.baseUrl + `/api/relations/users/${userId}/projects/${projectId}`;

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