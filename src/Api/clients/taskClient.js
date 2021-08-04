import axios from 'axios';
import Task from '../../models/Task';

export class TaskClient {
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

    get(projectId, taskId) {
        let url_ = this.baseUrl + `/api/projects/${projectId}/tasks/${taskId}`;

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
            const task = Task.fromJS(_response);
            return task;
        } else if (status !== 200) {
            return Promise.resolve({ status })
        }

        return Promise.resolve(null);
    }

    getTasks(projectId) {
        let url_ = this.baseUrl + `/api/projects/${projectId}/tasks`;

        let options_ = {
            method: "GET",
            url: url_,
            headers: this.headers_
        };

        return this.instance.request(options_).then((_response) => {
            return this.processGetTasks(_response);
        }).catch(error => {
             return this.processGetTasks(error.response);
        })
    }

    processGetTasks(response) {
        const status = response.status;

        if (status === 200) {
            let _response = response.data;
            if (Array.isArray(_response)) {
                let temp = _response.map((item) => !item.isDeleted && Task.fromJS({ ...item, Users: item.Users  }));
                let tasks = temp.filter(item => item)
                return tasks;
            }
        } else if (status !== 200) {
            return Promise.resolve({ status })
        }
        
        return Promise.resolve(null);
    }

    post(projectId,task) {
        let url_ = this.baseUrl + `/api/projects/${projectId}/tasks`;
  
        const content_ = JSON.stringify(task);

        let options_ ={
            data: content_,
            method: "POST",
            url: url_,
            headers: this.headers_
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
            const newTask = response.data;
            return Task.fromJS(newTask);
        } else if (status !== 201) {
            return Promise.resolve({ status })
        }

        return Promise.resolve(null);
    }

    put(projectId, taskId, task) {
        let url_ = this.baseUrl + `/api/projects/${projectId}/tasks/${taskId}`;

        const content_ = JSON.stringify(task);

        let options_ = {
            data: content_,
            method: "PUT",
            url: url_,
            headers: this.headers_
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

    delete(projectId, taskId){
        let url_ = this.baseUrl + `/api/projects/${projectId}/tasks/${taskId}`;

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