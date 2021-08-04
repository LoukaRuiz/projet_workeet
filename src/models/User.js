class User {

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
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            this.description = _data["description"];
            this.email = _data["email"];
            this.isAdmin = _data["isAdmin"];
            this.isDeleted = _data['isDeleted']
            this.createdAt = _data["createdAt"];
            this.updatedAt = _data["updatedAt"];
            this.createdBy = _data["createdBy"];
            this.updatedBy = _data["updatedBy"];
            this.Workspace = _data["Workspace"];
        }
    }

    static fromJS(data){
        data = typeof data === 'object' ? data : {};
        let result = new User();
        result.init(data);
        return result;
    }

}

export default User;