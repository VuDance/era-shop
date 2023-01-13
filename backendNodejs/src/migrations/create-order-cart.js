"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Orders",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        uniqueId: {
          type: Sequelize.STRING,
        },
        payment: {
          type: Sequelize.STRING,
        },
        paid: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        wait: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        transport: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        address: {
          type: Sequelize.STRING,
        },
        totalPrice: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        classMethods: {
          associate: function (models) {},
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Order");
  },
};
