class Task {

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
            this.title = _data["title"];
            this.duration = _data['duration']
            this.backgroundColor = _data["backgroundColor"];
            this.allDay = _data["allDay"];
            this.startDate = _data["startDate"];
            this.endDate = _data["endDate"];
            this.description = _data["description"];
            this.isDelete = _data["isDelete"];
            this.createdAt = _data["createdAt"];
            this.updateAt = _data["updateAt"];
            this.ProjectId = _data["ProjectId"];
            this.Users = _data['Users']
        }
    }

    static fromJS(data){
        data = typeof data === 'object' ? data : {};
        let result = new Task();
        result.init(data);
        return result;
    }

}

export default Task;