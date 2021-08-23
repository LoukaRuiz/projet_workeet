import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'
import Task from './task';

const Project = sequelize.define('Project', {
  	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
			allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	createdBy: {
		type: DataTypes.STRING
	},
	updatedBy: {
		type: DataTypes.STRING
	},
	isDeleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
}, {
  // Other model options go here
});

Project.hasMany(Task)
Task.belongsTo(Project)

sequelize.sync({ force: true })

export default Project;