import { Buffer } from "buffer";

const convertImageBase64 = (user) => {
  let image = "";
  if (user.avatar) {
    image = new Buffer(user.avatar, "base64").toString("binary");
  }
  return image;
};
export { convertImageBase64 };
