import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'
import User from './user';

const Workspace = sequelize.define('Workspace', {
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

User.hasOne(Workspace)
Workspace.belongsTo(User)

sequelize.sync({ force: true })
export default Workspace;