import db from "../models/index";

const uploadAddress = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ivalid = await db.Address.findOne({
        where: { userId: data.userId, accept: false },
      });
      if (ivalid) {
        await db.Address.update(
          {
            userId: data.userId,
            uniqueId: data.uniqueId,
            city: data.city,
            nameReceive: data.nameReceive,
            district: data.districts,
            ward: data.wardValue,
            address1: data.address1,
            address2: data.address2,
            phone: data.phone,
            email: data.email,
            note: data.note,
          },
          { where: { userId: data.userId } }
        );
        resolve({
          errCode: 0,
          message: "update",
        });
      } else {
        await db.Address.create({
          userId: data.userId,
          city: data.city,
          uniqueId: data.uniqueId,
          nameReceive: data.nameReceive,
          district: data.district,
          ward: data.wardValue,
          address1: data.address1,
          address2: data.address2,
          phone: data.phone,
          email: data.email,
          note: data.note,
        });
        resolve({
          errCode: 0,
          message: "create",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { uploadAddress: uploadAddress };
