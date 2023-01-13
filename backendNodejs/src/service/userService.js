import db from "../models/index";

let getAllUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (id === "ALL") {
        user = await db.User.findAll();
      }
      if (id && id !== "ALL") {
        user = await db.User.findOne({
          where: { id: id },
        });
      }
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserInfor = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: -1,
          message: "Missing param",
        });
      }
      let userNoPassword = await db.User.findOne({
        where: { id: id },
      });
      resolve({ userNoPassword });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data.avatar === null) {
        await db.User.update(
          {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          { where: { email: data.email } }
        );
      } else {
        await db.User.update(
          {
            firstName: data.firstName,
            lastName: data.lastName,
            avatar: data.avatar,
          },
          { where: { email: data.email } }
        );
      }
      resolve({
        errCode: 0,
        message: "success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllUser: getAllUser,
  getUserInfor: getUserInfor,
  updateUser: updateUser,
};
