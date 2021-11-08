var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
	image: String,
    title: String,
	text: String,
    author: String,
    Date: Date
});
module.exports = mongoose.model('blog', blogSchema);