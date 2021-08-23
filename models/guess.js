import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'

const guess = sequelize.define('guess', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    projectId: {
        type: DataTypes.STRING
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { timestamps: false } );

sequelize.sync({ force: true })

export default guess;