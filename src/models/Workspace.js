class Workspace {

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
            this.isDeleted = _data['isDeleted']
            this.createdBy = _data["createdBy"];
            this.updatedBy = _data["updatedBy"];
            this.UserId = _data["UserId"]
        }
    }

    static fromJS(data){
        data = typeof data === 'object' ? data : {};
        let result = new Workspace();
        result.init(data);
        return result;
    }
    
}

export default Workspace;