var mongoose = require("mongoose");

var aboutSchema = new mongoose.Schema({
	image: String,
    title: String,
    text: String
});
module.exports = mongoose.model('about', aboutSchema);