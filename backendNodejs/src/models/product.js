"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image1: DataTypes.STRING,
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      attribue: DataTypes.STRING,
      desc: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      inventory: DataTypes.INTEGER,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
