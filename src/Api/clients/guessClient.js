import axios from 'axios';
import Guess from '../../models/Guess';

export class GuessClient {
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

    getByEmail(email, projectId) {
        let url_ = this.baseUrl + `/api/guess/${email}/projects/${projectId}`;

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
            const guess = Guess.fromJS(_response);
            return guess;
        } else if (status !== 200) {
            return Promise.resolve({ status, message: response.data.error })
        }

        return Promise.resolve(null);
    }

    post(email, projectId) {
        let url_ = this.baseUrl + `/api/guess`;

        let content_ = {
            email: email,
            projectId: projectId
        }

        let options_ ={
            method: "POST",
            url: url_,
            headers: this.headers_,
            data: JSON.stringify(content_)
        };

        return this.instance.request(options_).then((_response) => {
            return this.processPost(_response);
        }).catch(error => {
             return this.processPost(error.response);
        })
    }

    processPost(response){
        const status = response.status;
        if (status !== 201) {
            return Promise.resolve({ status, message: response.data.error })
        }
        return Promise.resolve({ status });
    }

    delete(guessId, projectId) {
        let url_ = this.baseUrl + `/api/guess/${guessId}/projects/${projectId}`;

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

    processDelete(response) {
        const status = response.status;

        if (status !== 204) {
            return Promise.resolve({ status })
        }

        return Promise.resolve(null);
    }

}