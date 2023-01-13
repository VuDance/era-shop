import authService from "../service/authService";

const handleRegister = async (req, res) => {
  const message = await authService.registerUser(req.body);
  return res.status(200).json(message);
};
const handleLogin = async (req, res) => {
  const data = await authService.loginUser(req.body);
  return res.status(200).json(data);
};

module.exports = { handleRegister: handleRegister, handleLogin: handleLogin };
