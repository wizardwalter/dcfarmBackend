const { json } = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/admin");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// module.exports.createAdmin = (req, res, next) =>{
//      bcrypt.hash(req.body.password, 10).then(hash => {
//             const admin = new Admin({
//               email: req.body.email,
//               password: hash
//             });
//             admin
//               .save()
//               .then(result => {
//                 res.status(201).json({
//                   message: "User created!",
//                   result: result
//                 });
//               })
//               .catch(err => {
//                 res.status(500).json({
//                   error: err
//                 });
//               });
//           });
//     };

module.exports.loginAdmin = (req, res, next) => {
  let fetchedAdmin;
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      fetchedAdmin = admin;
      return bcrypt.compare(req.body.password, admin.password);
    })
    .then((result) => {
      if (!result) {
        return res.json({
          ok: false,
          message: "Wrong password please try again",
        });
      }
      const token = jwt.sign(
        { email: fetchedAdmin.email, adminId: fetchedAdmin._id },
        process.env.jwt_secret,
        { expiresIn: 50000 }
      );
      res.status(200).json({
        message: "Success",
        ok: true,
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.json({
        ok: false,
        message: "Wrong Email",
      });
    })
    .catch((err) => {
      return res.json({
        ok: false,
        message: "Are you trying to hack me?",
      });
    });
};
