"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Carts",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        image: {
          type: Sequelize.STRING,
        },
        belong: {
          type: Sequelize.STRING,
        },
        priceTotal: {
          type: Sequelize.INTEGER,
        },
        qty: {
          type: Sequelize.INTEGER,
        },
        ordered: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        userId: {
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
    await queryInterface.dropTable("Cart");
  },
};
