const employee = require("../models/model");

//create employee data
exports.createEmployee = (req, res) => {
  try {
    const image = req.file;
    const employeeData = new employee({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: image.path,
    });
    employeeData.save().then((result) => {
      res
        .status(200)
        .send({ status: true, msg: "data added succesfully", data: result });
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      msg: "data not added. Please recheck your code !",
    });
  }
};

//fatch all data
exports.fatchAllEmployee = (req, res) => {
  try {
    employee.find().then((result) => {
      res.status(200).send({
        status: true,
        msg: "data fatched succesfully...",
        data: result,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      msg: "Something went wrong. Please recheck your code !",
    });
  }
};

//fatch single data

exports.fatchSingleEmployee = (req, res) => {
  try {
    employee.findById({ _id: req.params.id }).then((result) => {
      res.status(200).send({
        status: true,
        msg: "data fatched succesfully...",
        data: result,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      msg: "Something went wrong. Please recheck your code !",
    });
  }
};

//update employee data

exports.updateEmployee = (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const image = req.file;
    employee.findById(id).then((data) => {
      (data.name = name),
        (data.email = email),
        (data.phone = phone),
        (data.image = image.path);
      return data.save().then((result) => {
        res.status(200).send({
          status: true,
          msg: "data updated succesfully...",
          data: result,
        });
      });
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      msg: "Something went wrong. Please recheck your code !",
    });
  }
};

//delete data

exports.deleteEmployee = (req, res) => {
  try {
    employee.findByIdAndDelete({ _id: req.params.id }).then((result) => {
      res.status(200).send({
        status: true,
        msg: "data deleted succesfully...",
        data: result,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      msg: "Something went wrong. Please recheck your code !",
    });
  }
};
