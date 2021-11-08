const { json } = require("body-parser");
const mongoose = require("mongoose");
const blog = require("../Models/blog");
const Blog = mongoose.model('blog');




module.exports.createBlog = (req,res) =>{
    console.log("request", req.body)
        var blog = new Blog();
        blog.image = req.file.filename;
        blog.title = req.body.title;
        blog.text = req.body.text;
        blog.author = req.body.author;
    
        blog.save((err, doc) => {
            if(!err){
                res.send(doc)
            } else{
                console.log(err)
            }
        }) 
};

module.exports.getBlogs = (req,res) =>{
    Blog.find()
    .then(blogs => {
        res.json({blogs:blogs})
    }) 
};

module.exports.getBlog = (req,res) => {
    Blog.findById(req.params.id)
    .exec((err,blog)=> {
        if(err) {
            console.log(err); 
        } else{
            console.log(blog);
            res.json({blog:blog});
        }  
    }) 
}; 

module.exports.editBlog = (req,res) =>{
    // Once photo upload complete make conditional to check if image = null or not
    console.log("request", req.body)
    Blog.findByIdAndUpdate(req.params.id,{$set:{
         _id: req.params.id,
         image : req.file.filename,
        title : req.body.title,
        text : req.body.text,
        author : req.body.author
    }},{new:true})
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'update was a success!',
            updatedBlog: result
    });
    })
};

module.exports.deleteBlog = (req,res) =>{
    Blog.deleteOne({_id:req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({message:"blog deleted successfully!"})
    })
};


    
