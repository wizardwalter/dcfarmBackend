var mongoose = require("mongoose");

var dogsSchema = new mongoose.Schema({
	image: String,
    name: String,
	about: String,
    Date: Date,
    coordinates: {
        latitude: Number,
         longtitude: Number
    }
});
module.exports = mongoose.model('dogs', dogsSchema);