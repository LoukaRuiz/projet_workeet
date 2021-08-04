import axios from 'axios';

export class EmailClient {
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

    send(username, email, projectId) {
        let url_ = this.baseUrl + `/api/services/email/${username}/${email}`;
        let content = {
            message: `${process.env.REACT_APP_UrlAppBase}/${projectId}/invitation`
        }

        let options_ = {
            method: "POST",
            url: url_,
            headers: this.headers_,
            data: JSON.stringify(content)
        };

        return this.instance.request(options_).then((_response) => {
            return this.processPost(_response);
        }).catch(error => {
            return this.processPost(error.response);
        })
    }

    processPost(response) {
        const status = response.status;
        if (status !== 200) {
            return Promise.resolve({ status, message: response.data.error })
        }
        return Promise.resolve(null);
    }

}