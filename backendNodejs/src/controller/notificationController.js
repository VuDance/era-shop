const db = require("../models");

const getNotification = async (req, res) => {
  const data = await db.Notification.findAll({
    where: { userId: req.query.id },
  });
  return res.status(200).json({
    mess: "ok",
    data: data,
  });
};
const uploadNotification = async (req, res) => {
  await db.Notification.create({
    userId: req.body.userId,
    notification: req.body.notification,
  });
  return res.status(200).json({
    mess: "ok",
  });
};
module.exports = {
  getNotification: getNotification,
  uploadNotification: uploadNotification,
};
