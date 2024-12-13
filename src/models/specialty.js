'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class spcialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    spcialty.init({

        description: DataTypes.TEXT,
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'spcialty',
    });
    return spcialty;
};