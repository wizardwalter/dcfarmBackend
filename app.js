require('./Models/db');
const express = require("express");
const cors = require ("cors");
const passport = require("passport");
const blogRoute = require("./Routes/blog");
const dogsRoute = require("./Routes/dogs");
const aboutRoute = require("./Routes/about");
const adminRoute = require("./Routes/admin");
const bodyParser = require("body-parser");
const  mongoose  = require("mongoose");




var app = express();
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://walter_admin:walter_1234@k9cs.llcjc.mongodb.net/k9cs?retryWrites=true&w=majority", {useNewUrlParser: true })
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
app.use("/dogs", dogsRoute);
app.use("/about", aboutRoute);
app.use("/admin", adminRoute);




app.listen( 8080, () =>{
    console.log(`Server is listening on port: 8080`)
})

