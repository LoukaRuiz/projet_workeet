import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'

const Task = sequelize.define('Task', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    backgroundColor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    allDay: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    // Other model options go here
});

sequelize.sync({ force: true })

export default Task;