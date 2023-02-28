import axios from "axios";

const getNoti = async (id) => {
  return await axios.get(`http://localhost:3030/api/get-notification?id=${id}`);
};
const uploadNoti = async (data) => {
  return await axios.post(
    `http://localhost:3030/api/upload-notification`,
    data
  );
};
export { getNoti, uploadNoti };
