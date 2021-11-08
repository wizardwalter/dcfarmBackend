const jwt = require('jsonwebtoken');
const enviromentVariable = require("../enviroment_variables.json")

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log("token", token)
        jwt.verify(token, "FKSIONBSI21389JDKF2KD4I92JDKJ");
        next();
    } catch (error){
        console.log(error);
        res.status(401).json({
            message: "Auth Failed!!"
        })
    }
    
}