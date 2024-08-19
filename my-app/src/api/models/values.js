const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Comunication = sequelize.define('Item', {
        comunicationValue: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});

    return Comunication
}