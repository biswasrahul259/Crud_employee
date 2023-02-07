const employee = require("../models/model");

exports.index = (req, res) => {
  employee.find().exec((err, data) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("index", {
        tittle: "home page",
        data: data,
      });
    }
  });
};

exports.addEmpoyee = (req, res) => {
  res.render("addEmployee", {
    tittle: "Add Employee",
  });
};

exports.postEmpoyee = (req, res) => {
  const image = req.file;
  const employees = new employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: image.path,
  });
  employees.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        type: "success",
        message: "Employee added successfully",
      };
      res.redirect("/");
    }
  });
};

//update employee page

exports.edit = (req, res) => {
  const id = req.params.id;
  employee.findById(id, (err, data) => {
    if (err) {
      res.redirect("/");
    } else {
      if (data == !null) {
        res.redirect("/");
      } else {
        res.render("editemployee", {
          tittle: "Edit User",
          data: data,
        });
      }
    }
  });
};

//Update employee details

exports.update = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const image = req.file;
  console.log(id, name, email, phone, image);
  
  employee.findById(id).then((data) => {
    (data.name = name),
      (data.email = email),
      (data.phone = phone),
      (data.image = image.path);
    return data
      .save()
      .then((result) => {
        req.session.message = {
          type: "success",
          message: "Employee updated successfully !!",
        };
        res.redirect("/");
      })
      .catch((err) => {
        req.session.message = {
          type: "danger",
          message: "user not updated",
        };
        res.redirect("/update");
      });
  });
};

//deelte Employee

exports.delete = (req, res) => {
  employee.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    req.session.message = {
      type: "success",
      message: "Employee deleted successfully !!",
    };
    res.redirect("/");
  });
};
