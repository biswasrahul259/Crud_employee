const Router = require("express").Router();
const controller = require("../controllers/UIcontroller");
const veryfyEmployee = require("../middleware/veryfyEmployee");

Router.get("/", controller.index);
Router.get("/addEmployee", controller.addEmpoyee);
Router.post(
  "/addEmployee",
  [veryfyEmployee.checkDuplicateData],
  controller.postEmpoyee
);
Router.get("/update/:id", controller.edit);
Router.post("/update/:id", controller.update);
Router.get("/delete/:id", controller.delete);

module.exports = Router;
