import db from "../models/index";

const getOrder = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: -1,
          message: "Missing param",
        });
      }
      let order = await db.Order.findAll({
        where: { userId: id },
      });
      resolve(order);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { getOrder: getOrder };
