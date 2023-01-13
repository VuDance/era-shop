const { getOrder } = require("../service/orderService");
import db from "../models";

const getOrderUser = async (req, res) => {
  let id = req.query.id;
  const data = await getOrder(id);
  return res.status(200).json({
    data: data,
  });
};
const createOrderUser = async (req, res) => {
  await db.Order.create({
    uniqueId: req.body.uniqueId,
    userId: req.body.userId,
    payment: req.body.payment,
    totalPrice: req.body.totalPrice,
    address: req.body.address,
  });
  await db.Cart.update(
    { ordered: true, belong: req.body.uniqueId },
    {
      where: { ordered: false },
    }
  );
  return res.status(200).json({
    mess: "ok",
  });
};
const updateOrder = async (req, res) => {
  await db.Order.update(
    {
      paid: req.body.paid,
      wait: req.body.wait,
    },
    { where: { uniqueId: req.body.uniqueId } }
  );
  return res.status(200).json({
    mess: "ok",
  });
};
module.exports = {
  updateOrder: updateOrder,
  getOrderUser: getOrderUser,
  createOrderUser: createOrderUser,
};
