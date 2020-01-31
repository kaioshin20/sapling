const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    place:String,
    lat:String,
    long:String
});

module.exports = mongoose.model("Location", locationSchema);