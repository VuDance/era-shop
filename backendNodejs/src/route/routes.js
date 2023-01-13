import express from "express";
import userController from "../controller/userController";
import authController from "../controller/authController";
import middlewareController from "../controller/middlewareController";
import productController from "../controller/productController";
import cartController from "../controller/cartController";
import orderContoller from "../controller/orderContoller";
import addressController from "../controller/addressController";
import notificationController from "../controller/notificationController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get(
    "/api/get-all-user",
    middlewareController.verifyToken,
    userController.handleGetAll
  );
  router.post("/api/register", authController.handleRegister);
  router.post("/api/login", authController.handleLogin);

  router.get("/api/products", productController.handleGetALLProduct);
  router.get(
    "/api/get-product-detail",
    productController.handleGetDetailProduct
  );
  router.get(
    "/api/product-sort-desc",
    productController.handleGetProductWithSortDesc
  );
  router.get(
    "/api/product-sort-asc",
    productController.handleGetProductWithSortAsc
  );
  router.get(
    "/api/get-data-with-page",
    productController.handleGetProductWithPage
  );
  router.get(
    "/api/get-data-by-caterogy",
    productController.handleGetProductByCaterogy
  );
  router.get(
    "/api/get-data-by-caterogy-with-page",
    productController.handleGetDataCategoryWithPage
  );

  router.get("/api/get-order", orderContoller.getOrderUser);
  router.post("/api/create-order", orderContoller.createOrderUser);
  router.post("/api/update-order", orderContoller.updateOrder);

  router.get("/api/get-user-infor", userController.handleGetUserInfor);
  router.post("/api/update-user", userController.handleUpdate);

  router.post("/api/add-cart", cartController.addCart);
  router.get("/api/get-cart", cartController.getCart);
  router.post("/api/remove-cart", cartController.removeCart);
  router.post("/api/cart-order", cartController.cartOrder);
  router.get("/api/get-cart-ordered", cartController.getCartOrdered);

  router.post(
    "/api/upload-notification",
    notificationController.uploadNotification
  );
  router.get("/api/get-notification", notificationController.getNotification);

  app.use("/", router);
};

export { initWebRoutes };
