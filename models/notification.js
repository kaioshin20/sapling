const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
	userId:String,
	userName:String,
	eventId:String,
	label:String,
	desc:String,
	isRead: { 
		type: Boolean, 
		default: false 
	}
});

module.exports = mongoose.model("Notification", notificationSchema);