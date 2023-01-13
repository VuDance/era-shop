import userService from "../service/userService";

let handleGetAll = async (req, res) => {
  let id = req.query.id;
  let user = await userService.getAllUser(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    user: user,
  });
};

const handleGetUserInfor = async (req, res) => {
  let userNoPassword = await userService.getUserInfor(req.query.id);
  return res.status(200).json(userNoPassword);
};
const handleUpdate = async (req, res) => {
  await userService.updateUser(req.body);
  return res.status(200).json({
    errCode: 0,
    errMessage: "user infor update",
  });
};
module.exports = {
  handleGetAll: handleGetAll,
  handleGetUserInfor: handleGetUserInfor,
  handleUpdate: handleUpdate,
};
