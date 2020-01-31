const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    interested:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    eventDate:Date,
    minPeople:Number,
    timePeriod:String,
    image:String,
    imageId:String,
});

module.exports= mongoose.model("Event",eventSchema);    