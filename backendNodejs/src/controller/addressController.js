import addressService from "../service/addressService";

const handleAddress = async (req, res) => {
  const data = await addressService.uploadAddress(req.body);
  return res.status(200).json(data);
};
module.exports = { handleAddress: handleAddress };
