const express             = require("express"),
      router              = express.Router(),
      Event               = require("../models/event"),
      User                = require("../models/user"),
      middleware          = require("../middleware/verify"),
      {cloudinary,upload} = require("../utils/cloudinary");

router.get("/create",middleware.isLoggedIn,(req,res)=>{

})

//CREATING NEW EVENT
router.post("/" ,middleware.isLoggedIn,upload.single("image"),async function(req,res){
    try{
        let result= await cloudinary.uploader.upload(req.file.path);
        req.body.event.image = result.secure_url;
        req.body.event.imageId = result.public_id;
        req.body.event.admin = req.user._id;
        let event=await Event.create(req.body.blog);
        res.redirect("/events");
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("back");
    }
});

//SHOW EITHER ALL BLOGS ON INDEX PAGE OR ON THE BASIS OF SEARCH RESULTS
router.get("/",async function(req,res){
    try{
        let oldEvents=await Events.find().where("eventDate"-Date.now<=0).sort("-_id").exec();
        let futureEvents=await Events.find().where("eventDate"-Date.now>=0).sort("-_id").exec();
        let currentUser= await User.findById(req.user._id);
        let users=await User.find().where("location").equals(currentUser.location);
        res.json({oldEvents,futureEvents,users});
    }
    catch(err){
        res.redirect("back");
    }
})

module.exports=router;