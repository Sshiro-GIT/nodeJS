const express = require("express");
const productsRoutes = require("./products/products.routes");
const usersRoutes = require("./users/users.routes");
const filesRoutes = require("./files/files.routes");
const authorizer = require("../middlewares/authorizer");
const logger = require("../middlewares/logger");
const router = express.Router();

const middleware = [logger];
//Middlewares
router.use([middleware]);
router.use("/products", productsRoutes);
router.use("/users", authorizer, usersRoutes);
router.use(filesRoutes);
//Routes

module.exports = router;
