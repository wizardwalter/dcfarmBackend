const { json } = require("body-parser");
const mongoose = require("mongoose");
const dogs = require("../Models/dogs");
const Dogs = mongoose.model('dogs');


module.exports.createDogs = (req,res)=>{
   var dog = new Dogs();
   dog.image = req.file.filename;
   dog.name = req.body.name;
   dog.about = req.body.about;
   dog.date = Date(mongoose.now);
   dog.coordinates.latitude = req.body.latitude; 
   dog.coordinates.longtitude = req.body.longtitude;

   dog.save((err,doc)=>{
       if(!err){
           res.send(doc)
       } else{
           console.log(err);
           res.status(404).json({message: 'could not save dog to database'});
       }
   })
};

module.exports.getDogs = (req,res)=>{
    Dogs.find()
      .then(dogs =>{
          res.json({dogs:dogs});
      })
};

module.exports.getDog = (req,res)=>{
    Dogs.findById(req.params.id)
        .exec((err,dog)=>{
            if(err){
                console.log(err);
                res.status(400).json({message: 'could not retrieve dog by ID'});
            } else{
                console.log(dog);
                res.json({dog:dog});
            }
        })
};

module.exports.deleteDog = (req,res) =>{
    Dogs.findByIdAndDelete(req.params.id)
    .exec((err,dog)=>{
        if(err){
            console.log(err);
            res.status(400).json({message: 'dog could not be deleted, please try again'});
        } else {
            res.status(200).json({message: dog + 'deleted'})
        }
    })
}

module.exports.editDog = (req,res) =>{
    console.log("request", req.body)
    Dogs.findByIdAndUpdate(req.params.id,{$set:{
         _id: req.params.id,
         image : req.file.filename,
        name : req.body.name,
        about : req.body.about,
        date :  Date(mongoose.now),
        coordinates:{
            latitude: req.body.latitude,
            longtitude: req.body.longtitude
        }
        
    }},{new:true})
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'update was a success!',
            updatedBlog: result
    });
    })
}