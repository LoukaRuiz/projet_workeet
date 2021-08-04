class Project {

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
            this.name = _data["name"];
            this.description = _data['description']
            this.createdAt = _data["createdAt"];
            this.updatedAt = _data["updatedAt"];
            this.createdBy = _data["createdBy"];
            this.updatedBy = _data["updatedBy"];
            this.isAdmin = _data["isAdmin"]
            this.isDeleted = _data['isDeleted']
            this.Users = _data['Users']
        }
    }

    static fromJS(data){
        data = typeof data === 'object' ? data : {};
        let result = new Project();
        result.init(data);
        return result;
    }
    
}

export default Project;