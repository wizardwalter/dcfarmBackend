const { json } = require("body-parser");
const mongoose = require("mongoose");
const about = require("../Models/about-us");
const About = mongoose.model('about');


module.exports.createAbout = (req,res) =>{
    var about = new About();
    about.image = req.body.image;
    about.title = req.body.title;
    about.text = req.body.text;

    about.save((err, doc) => {
        if(!err){
            res.send(doc)
        } else{
            console.log(err)
        }
    })
};

module.exports.getAbout = (req,res) =>{
    About.find()
    .then(about => {
        res.json({about:about})
    }) 
};

    
