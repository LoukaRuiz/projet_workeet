class Guess {

    constructor(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }

    init(_data) {
        if (_data) {
            this.id = _data["id"];
            this.email = _data["email"];
            this.projectId = _data["projectId"];
            this.isDeleted = _data['isDeleted']
            this.createdAt = _data["created"];
            this.updatedAt = _data["updated"];
            this.createdBy = _data["createdBy"];
            this.updatedBy = _data["updatedBy"];
        }
    }

    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new Guess();
        result.init(data);
        return result;
    }

}

export default Guess;