import axios from "axios";

const addCart = async (cart) => {
  return await axios.post("http://localhost:3030/api/add-cart", cart);
};
const getCart = async (id) => {
  return await axios.get(`http://localhost:3030/api/get-cart?id=${id}`);
};
const removeCart = async (id) => {
  return await axios.post(`http://localhost:3030/api/remove-cart?id=${id}`);
};
const orderCart = async (cart) => {
  return await axios.post("http://localhost:3030/api/cart-order", cart);
};
const getCartOrdered = async (id) => {
  return await axios.get(`http://localhost:3030/api/get-cart-ordered?id=${id}`);
};
export { addCart, getCart, removeCart, orderCart, getCartOrdered };
