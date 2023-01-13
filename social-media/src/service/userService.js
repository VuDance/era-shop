import axios from "axios";

const getUserInfor = async (id) => {
  return await axios.get(`http://localhost:3030/api/get-user-infor?id=${id}`);
};
const updateUser = async (data) => {
  return await axios.post(`http://localhost:3030/api/update-user`, data);
};

export { getUserInfor, updateUser };
