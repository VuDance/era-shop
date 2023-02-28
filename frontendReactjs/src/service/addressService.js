import axios from "axios";

const getAddress = async () => {
  return await axios.get("https://provinces.open-api.vn/api/?depth=3");
};

export { getAddress };
