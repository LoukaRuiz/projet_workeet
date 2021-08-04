import axios from 'axios';
import User from '../../models/User';

export class UserClient {
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

    get(userId) {
        let url_ = this.baseUrl + `/api/users/${userId}`;

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
            

            const user = User.fromJS(_response);
            return user;
        } else if (status !== 200) {
            return Promise.resolve({ status })
        }

        return Promise.resolve(null);
    }

    getByEmail(email) {
        let url_ = this.baseUrl + `/api/users/email/${email}`;

        let options_ = {
            method: "GET",
            url: url_,
            headers: this.headers_
        };

        return this.instance.request(options_).then((_response) => {
            return this.processGetByEmail(_response);
        }).catch(error => {
            return this.processGetByEmail(error.response);
        })
    }

    processGetByEmail(response) {
        const status = response.status;

        if (status === 200) {
            const _response = response.data;
            const user = User.fromJS(_response);
            return user;
        } else if (status !== 200) {
            return Promise.resolve({ status, message: response.data.error })
        }

        return Promise.resolve(null);
    }

    getUsers(projectId) {
        let url_ = this.baseUrl + `/api/users/projects/${projectId}`;

        let options_ = {
            method: "GET",
            url: url_,
            headers: this.headers_
        };

        return this.instance.request(options_).then((_response) => {
            return this.processGetUsers(_response);
        }).catch(error => {
             return this.processGetUsers(error.response);
        })
    }

    processGetUsers(response) {
        const status = response.status;
        if (status === 200) {
            let _response = response.data;
            if (Array.isArray(_response.Users)) {
                let temp = _response.Users.map((item) => !item.isDeleted && User.fromJS({ ...item }));
                let users = temp.filter(item => item)
                return users;
            }
        } else if (status !== 200) {
            return Promise.resolve({ status })
        }
        
        return Promise.resolve(null);
    }

    post(user) {
        let url_ = this.baseUrl + `/api/users`;
  
        const content_ = JSON.stringify(user);

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
            const newUser = response.data;
            return User.fromJS({ ...newUser } );
        } else if (status !== 201) {
            return Promise.resolve({ status, message: response.data.error })
        }

        return Promise.resolve(null);
    }

    put(userId, user) {
        let url_ = this.baseUrl + `/api/users/${userId}`;

        const content_ = JSON.stringify(user);

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

    delete(userId){
        let url_ = this.baseUrl + `/api/users/${userId}`;

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