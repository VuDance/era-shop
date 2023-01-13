"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Products",
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
        image1: {
          type: Sequelize.STRING,
        },
        image2: {
          type: Sequelize.STRING,
        },
        image3: {
          type: Sequelize.STRING,
        },
        attribue: {
          type: Sequelize.STRING,
        },
        desc: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.INTEGER,
        },
        discount: {
          type: Sequelize.INTEGER,
        },
        inventory: {
          type: Sequelize.INTEGER,
        },
        category: {
          type: Sequelize.STRING,
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
          associate: function (models) {
            Product.hasMany(models.User);
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
