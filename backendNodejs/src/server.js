import bodyParser from "body-parser";
import express from "express";
import { initWebRoutes } from "./route/routes";
require("dotenv").config();
var cors = require("cors");

let app = express();
app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

initWebRoutes(app);

let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("running" + port);
});
