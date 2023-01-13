"use strict";
const { Model, NUMBER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Cart.init(
    {
      userId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      ordered: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      priceTotal: DataTypes.INTEGER,
      belong: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
