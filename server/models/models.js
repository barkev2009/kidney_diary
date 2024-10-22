const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { Sequelize } = require('../db');

const User = sequelize.define(
    'user',
    {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, allowNull: false, autoIncrement: true },
        login: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        uuid: { type: DataTypes.STRING, allowNull: false }
    }
)

const UserParameter = sequelize.define(
    'user_parameter',
    {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, allowNull: false, autoIncrement: true },
        water_limit: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        step_limit: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    }
)

const Item = sequelize.define(
    'item',
    {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, allowNull: false, autoIncrement: true },
        date: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
        water: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        steps: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    }
)

User.hasOne(UserParameter);
UserParameter.belongsTo(User);

User.hasMany(Item);
Item.belongsTo(User);

module.exports = {
    User, UserParameter, Item
};