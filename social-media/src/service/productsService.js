import axios from "axios";

const getAllProduct = async () => {
  return await axios.get("http://localhost:3030/api/products");
};

const getProductWithPage = async (page) => {
  return await axios.get(
    `http://localhost:3030/api/get-data-with-page?page=${page}`
  );
};

const getProductsWithSortDecrease = async (page) => {
  return await axios.get(
    `http://localhost:3030/api/product-sort-desc?page=${page}`
  );
};
const getProductsWithSortIncrease = async (page) => {
  return await axios.get(
    `http://localhost:3030/api/product-sort-asc?page=${page}`
  );
};

const getDeatilProduct = async (id) => {
  return await axios.get(
    `http://localhost:3030/api/get-product-detail?id=${id}`
  );
};
const getDatabyCategory = async (category) => {
  return await axios.get(
    `http://localhost:3030/api/get-data-by-caterogy?category=${category}`
  );
};
const getDataCategoryWithPage = async (category, page) => {
  return await axios.get(
    `http://localhost:3030/api/get-data-by-caterogy-with-page?page=${page}&category=${category}`
  );
};
export {
  getProductWithPage,
  getAllProduct,
  getProductsWithSortDecrease,
  getProductsWithSortIncrease,
  getDeatilProduct,
  getDatabyCategory,
  getDataCategoryWithPage,
};
