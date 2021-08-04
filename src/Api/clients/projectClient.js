import axios from 'axios';
import Project from '../../models/Project';

export class ProjectClient {
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
        let url_ = this.baseUrl + `/api/users/${userId}/projects/${projectId}`;

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
            const project = Project.fromJS(_response);
            return project;
        } else if (status !== 200) {
            return Promise.resolve({ status, message: response.data.error })
        }

        return Promise.resolve(null);
    }

    getAll(userId) {
        let url_ = this.baseUrl + `/api/users/${userId}/projects`;

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
            let _response = response.data;
            if (Array.isArray(_response.Projects)) {
                let temp = _response.Projects.map((item) => !item.isDeleted && Project.fromJS({ ...item, isAdmin: item.User_Project.isAdmin }));
                let projects = temp.filter(item => item)
                return projects;
            }
        } else if (status !== 200) {
            return Promise.resolve({ status })
        }

        return Promise.resolve(null);
    }

    post(userId, project) {
        let url_ = this.baseUrl + `/api/users/${userId}/projects`;
        const content_ = JSON.stringify(project);

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
            return Project.fromJS(newProject);
        } else if (status !== 201) {
            return Promise.resolve({ status, message: response.data.error})
        }

        return Promise.resolve(null);
    }

    put(userId, projectId, project) {
        let url_ = this.baseUrl + `/api/users/${userId}/projects/${projectId}`;

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
        let url_ = this.baseUrl + `/api/users/${userId}/projects/${projectId}`;

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