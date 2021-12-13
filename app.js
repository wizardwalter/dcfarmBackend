require('./Models/db');
const express = require("express");
const cors = require ("cors");
const passport = require("passport");
const blogRoute = require("./Routes/blog");
const adminRoute = require("./Routes/admin");
const bodyParser = require("body-parser");
const  mongoose  = require("mongoose");
require('dotenv').config()




var app = express();
app.use(express.json({limit: '20000mb'}));
app.use(express.urlencoded({extended: true, limit:'20000mb'}));
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=>{
        console.log("connection successful");
    })
    .catch(()=>{
        console.log("connection failed");
    });
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Orgin, X-Requested-With, Content-Type, Accept, authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    next();
});

app.use("/blogs", blogRoute);
app.use("/admin", adminRoute);




app.listen(process.env.PORT|| 8080, () =>{
    console.log(`Server is listening on port: 8080`)
})

