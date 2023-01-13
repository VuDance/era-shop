"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        name: `item `,
        image1:
          "https://cdn0.fahasa.com/media/catalog/product/m/u/muonkiepnhansinh.jpg",
        image2:
          "https://cdn0.fahasa.com/media/catalog/product/m/u/muonkiepnhansinh.jpg",
        image3:
          "https://cdn0.fahasa.com/media/catalog/product/m/u/muonkiepnhansinh.jpg",
        attribue: "dep,sang,chanh",
        desc: "hahahgaghaahahahahh",
        attribue: "Đặc tính 1, Đặc tính 2, Đặc tính 3",
        inventory: 20,
        category: "book",
        price: 10,
        discount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
