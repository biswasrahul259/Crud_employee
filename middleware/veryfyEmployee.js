const employee = require("../models/model");

exports.checkDuplicateData = (req, res, next) => {
  employee
    .findOne({
      name: req.body.name,
    })
    .exec((err, name) => {
      if (err) {
        console.log("err");
        return;
      }
      if (name) {
        // res.status(400).send({status:false,msg:'alredy teken',})
        req.session.message = {
          type: "success",
          message: "Employee name already exists",
        };
        return res.redirect("/addEmployee");
      }

      employee
        .findOne({
          email: req.body.email,
        })
        .exec((err, email) => {
          if (err) {
            console.log("err");
            return;
          }
          if (email) {
            req.session.message = {
              type: "success",
              message: "Employee email already exists",
            };
            return res.redirect("/addEmployee");
          }
          employee
            .findOne({
              phone: req.body.phone,
            })
            .exec((err, number) => {
              if (err) {
                console.log("err");
                return;
              }
              if (number) {
                req.session.message = {
                  type: "success",
                  message: "Employee phone number already exists",
                };
                return res.redirect("/addEmployee");
              }
              next();
            });
        });
    });
};
