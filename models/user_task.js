import { DataTypes } from 'sequelize';
import sequelize from '../sequelize'
import Task from './task';
import User from './user';

const User_Task = sequelize.define('User_Task', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { timestamps: false });

User.belongsToMany(Task, { through: User_Task });
Task.belongsToMany(User, { through: User_Task });

export default User_Task;