const Router = require("express").Router();
const controller = require("../controllers/apiController");

Router.get("/", controller.fatchAllEmployee);
Router.get("/single/:id", controller.fatchSingleEmployee);
Router.post("/create", controller.createEmployee);
Router.post("/update/:id", controller.updateEmployee);
Router.get("/delete/:id", controller.deleteEmployee);

module.exports = Router;
