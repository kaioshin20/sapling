const mongoose = require("mongoose");

const plantsSchema = new mongoose.Schema({
    name:String,
    imageId:String,
    climate:String,
    aqi:Boolean,
    wiki:String
});

module.exports = mongoose.model("Plants", plantsSchema);