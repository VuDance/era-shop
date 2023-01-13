"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      uniqueId: DataTypes.STRING,
      paid: DataTypes.BOOLEAN,
      wait: DataTypes.BOOLEAN,
      transport: DataTypes.BOOLEAN,
      payment: DataTypes.STRING,
      address: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
