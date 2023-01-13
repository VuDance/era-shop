import db from "../models/index";

const handleGetALLProduct = async (req, res) => {
  const product = await db.Product.findAll();
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    product: product,
  });
};
const handleGetProductWithPage = async (req, res) => {
  const page = req.query.page;
  const product = await db.Product.findAll({
    limit: 20,
    offset: (page - 1) * 20,
  });
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    product: product,
  });
};
const handleGetProductWithSortDesc = async (req, res) => {
  const page = req.query.page;
  const product = await db.Product.findAll({
    order: [["price", "DESC"]],
    limit: 20,
    offset: (page - 1) * 20,
  });
  return res.status(200).json({
    product: product,
  });
};
const handleGetProductWithSortAsc = async (req, res) => {
  const page = req.query.page;
  const product = await db.Product.findAll({
    order: [["price", "ASC"]],
    limit: 20,
    offset: (page - 1) * 20,
  });
  return res.status(200).json({
    product: product,
  });
};
const handleGetDetailProduct = async (req, res) => {
  let id = req.query.id;
  const product = await db.Product.findOne({ where: { id: id } });
  return res.status(200).json({
    product: product,
  });
};
const handleGetProductByCaterogy = async (req, res) => {
  let category = req.query.category;
  const product = await db.Product.findAll({ where: { category: category } });
  return res.status(200).json({
    product: product,
  });
};
const handleGetDataCategoryWithPage = async (req, res) => {
  const page = req.query.page;
  const category = req.query.category;
  const product = await db.Product.findAll({
    where: { category: category },
    limit: 20,
    offset: (page - 1) * 20,
  });
  return res.status(200).json({
    product: product,
  });
};
module.exports = {
  handleGetALLProduct: handleGetALLProduct,
  handleGetDetailProduct: handleGetDetailProduct,
  handleGetProductWithPage: handleGetProductWithPage,
  handleGetProductWithSortDesc: handleGetProductWithSortDesc,
  handleGetProductWithSortAsc: handleGetProductWithSortAsc,
  handleGetProductByCaterogy: handleGetProductByCaterogy,
  handleGetDataCategoryWithPage: handleGetDataCategoryWithPage,
};
