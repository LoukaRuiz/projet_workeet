import { DataTypes } from 'sequelize';
import sequelize from '../sequelize'
import Project from './project';
import User from './user';

const User_Project = sequelize.define('User_Project', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { timestamps: false });

User.belongsToMany(Project, { through: User_Project });
Project.belongsToMany(User, { through: User_Project });

export default User_Project;