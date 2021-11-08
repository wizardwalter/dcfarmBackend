const { json } = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/admin");
const bcrypt = require("bcryptjs");
const enviromentVariable = require("../enviroment_variables.json");

module.exports.createAdmin = (req, res, next) =>{
     bcrypt.hash(req.body.password, 10).then(hash => {
            const admin = new Admin({
              email: req.body.email,
              password: hash
            });
            admin
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created!",
                  result: result
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          });
    };

  module.exports.loginAdmin = (req,res,next) =>{
    let fetchedAdmin;
    Admin.findOne({ email: req.body.email })
      .then(admin => {
        if (!admin) {
          return res.status(401).json({
            message: "Auth failed 1"
          });
        }
        fetchedAdmin = admin;
          return bcrypt.compare(req.body.password, admin.password)
      })
          .then (result => {
              if (!result) {
                return res.status(401).json({
                  message: "Auth failed 2 "
                });
              }
              const token = jwt.sign(
                { email: fetchedAdmin.email, adminId: fetchedAdmin._id },
                enviromentVariable["jwt-secret"],
                { expiresIn: "1d" }
              );
              res.status(200).json({
                token: token,
                expiresIn: 3600
              });
            })
            .catch(err => {
              return res.status(401).json({
                message: "Auth failed 3",
                error: err
              });
            });
  };