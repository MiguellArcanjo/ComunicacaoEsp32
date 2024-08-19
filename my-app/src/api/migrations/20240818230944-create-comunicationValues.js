'use strict';

const { QueryInterface, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('ComunicationValues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comunicationValues: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    })
  },
  down: async (QueryInterface, Sequelize) => {
    await QueryInterface.dropTable('ComunicationValues')
  }
};
