import axios from "axios";

const getOrder = async (id) => {
  return await axios.get(`http://localhost:3030/api/get-order?id=${id}`);
};
const createOrder = async (data) => {
  return await axios.post("http://localhost:3030/api/create-order", data);
};
const updateOrder = async (data) => {
  return await axios.post("http://localhost:3030/api/update-order", data);
};
export { getOrder, createOrder, updateOrder };
