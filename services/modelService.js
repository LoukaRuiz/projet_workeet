
export class ModelService {

    constructor(model) {
        this.model = model
    }

    async verify (id, includeModel) {
        if(id){
            let entity;
            if(includeModel) {
                entity = await this.model.findOne({ where: { id: id, isDeleted: false }, include: includeModel });
            }else{
                entity = await this.model.findOne({ where: { id: id, isDeleted: false }});
            }
            if(entity && (entity instanceof this.model)){
                return { exists: true, data: entity, message: `The ${this.model.name} exist` }
            }else{
                return { exists: false, message: `The ${this.model.name} does not exist`}
            }
        }
        return { exists: false, message: `The ${this.model.name} id cannot be null`}
    }

    async verifyByEmail(email, includeModel) {
        if (email) {
            let entity;
            if (includeModel) {
                entity = await this.model.findOne({ where: { email: email, isDeleted: false }, include: includeModel });
            } else {
                entity = await this.model.findOne({ where: { email: email, isDeleted: false } });

            }
            if (entity && (entity instanceof this.model)) {
                return { exists: true, data: entity, message: `The ${this.model.name} exist` }
            } else {
                return { exists: false, message: `The ${this.model.name} does not exist` }
            }
        }
        return { exists: false, message: `The ${this.model.name} id cannot be null` }
    }

    async AddAsync(entity, includeModel) {
        try {
            const newEntity = this.model.build(entity);
            await newEntity.save();
            return { isAdded: true, data: newEntity }
        } catch (error) {
            return { isAdded: false, message: error.message }
        }
    }

    async updateAsync(id, entityToUpdate) {
        try {
            const entity = await this.model.update(entityToUpdate, { where: { id: id } })
            return { isUpdated: true, data: entity }
        } catch (error) {
            return { isUpdated: false, message: error.message }
        }
    }

    async deleteAsync(id) {
        try {
            await this.model.update({ isDeleted: true }, { where: { id: id } })
            return { isDelete: true, data: null }
        } catch (error) {
            return { isUpdated: false, message: error.message }
        }
    }

    

    
}