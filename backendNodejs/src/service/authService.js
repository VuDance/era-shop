import db from "../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: data.email },
      });
      if (user) {
        resolve({
          errCode: -1,
          message: "email is used",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(data.password, salt);
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPassword,
          avatar: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: data.email },
      });
      if (!user) {
        resolve({ errCode: 1, message: "wrong email" });
      }
      const validPassword = await bcrypt.compare(data.password, user.password);

      if (!validPassword) {
        resolve({ errCode: 2, message: "wrong password" });
      }
      if (user && validPassword) {
        const token = jwt.sign(
          { id: user.id, admin: user.admin },
          process.env.KEY,
          {
            expiresIn: "2d",
          }
        );
        const userNoPassword = await db.User.findOne({
          attributes: {
            exclude: ["password"],
          },
          where: { email: data.email },
        });
        resolve({ userNoPassword, token });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { registerUser: registerUser, loginUser: loginUser };
