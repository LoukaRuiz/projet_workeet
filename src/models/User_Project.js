class UserProject {

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
            this.UserId = _data["UserId"];
            this.ProjectId = _data['ProjectId']
            this.isAdmin = _data["isAdmin"]
            this.isDeleted = _data['isDeleted']
            this.createdAt = _data["createdAt"];
            this.updatedAt = _data["updatedAt"];
        }
    }

    static fromJS(data){
        data = typeof data === 'object' ? data : {};
        let result = new UserProject();
        result.init(data);
        return result;
    }
    
}

export default UserProject;