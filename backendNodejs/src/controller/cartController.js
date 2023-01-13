const db = require("../models");

const addCart = async (req, res) => {
  const invalid = await db.Cart.findOne({
    where: { name: req.body.name, ordered: false },
  });
  if (invalid) {
    await db.Cart.increment(
      { qty: +req.body.qty },
      { where: { name: req.body.name } }
    );
  } else {
    await db.Cart.create({
      name: req.body.name,
      image: req.body.image,
      userId: req.body.userId,
      qty: req.body.qty,
      priceTotal: req.body.priceTotal,
      belong: req.body.belong,
    });
  }
  return res.status(200).json({
    mess: "ok",
  });
};
const cartOrder = async (req, res) => {
  await db.Cart.update(
    {
      qty: req.body.qty,
      belong: req.body.belong,
    },
    { where: { name: req.body.name } }
  );
  return res.status(200).json({
    mess: "update success",
  });
};
const getCard = async (req, res) => {
  let id = req.query.id;
  const data = await db.Cart.findAll({ where: { userId: id, ordered: false } });
  return res.status(200).json({
    cart: data,
  });
};
const getCartOrdered = async (req, res) => {
  let id = req.query.id;
  const data = await db.Cart.findAll({ where: { userId: id, ordered: true } });
  return res.status(200).json({
    cart: data,
  });
};
const removeCart = async (req, res) => {
  let id = req.query.id;
  await db.Cart.destroy({ where: { id: id } });
  return res.status(200).json({
    message: "ok",
  });
};
module.exports = {
  addCart: addCart,
  getCart: getCard,
  removeCart,
  cartOrder,
  getCartOrdered,
};
