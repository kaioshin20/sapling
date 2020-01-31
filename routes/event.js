const express             = require("express"),
      router              = express.Router(),
      request             = require("request"),
      Event               = require("../models/event"),
      User                = require("../models/user"),
      Location            = require("../models/location"),
      Plant               = require("../models/plant"),
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
        res.redirect(`/event/$(event.id)`);
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

router.get("/event/:id",(req,res)=>{
    let event = Event.findById(req.params.id);
    let location = Location.find().where("place").equals(event.location);     
    const lat = location.lat;
    const long = location.long;
    var options = {
        'method': 'GET',
        'url': `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=db146a1a-9603-46cc-a580-95abaae0b5d3`,
        'headers': {
        }
    };
    request(options,(err, response)=> { 
        if(err){
            console.log(err);
        }
        else{
            let data;
            data.tp=response.data.location.current.weather.tp;
            data.hu=response.data.location.current.weather.hu;
            data.ws=response.data.location.current.weather.ws;
            data.tp=response.data.location.current.weather.tp;
            data.aqius=response.data.location.current.pollution.aqius;
            data.mainus=response.data.location.current.pollution.mainus;
            let plants;
            if(data.aqius<100)
                plants = Plant.find().where("aqi").equals(false);
            else{
                plants= Plant.find().where("aqi").equals(true);
            }
            res.json({event,data,plants});                       
        }
    });
})

router.get("/event/:id/interested", middleware.isLoggedIn,(req,res)=>{
    let event = Event.findById(req.params.id);
    let userid = req.user._id;
    event.interested.push(userid);
    res.json({status: "200"});
})

module.exports=router;