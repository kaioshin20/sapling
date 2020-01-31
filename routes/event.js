const express             = require("express"),
      router              = express.Router(),
      request             = require("request"),
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
    request(url,(err,response)=>{
        if(err){
            console.log(err);
        }
        const lat = response.lat;
        const long = response.long;
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
            let data;
            data.tp=response.data.location.current.weather.tp;
            data.hu=response.data.location.current.weather.hu;
            data.ws=response.data.location.current.weather.ws;
            data.tp=response.data.location.current.weather.tp;
            data.aqius=response.data.location.current.pollution.aqius;
            data.mainus=response.data.location.current.pollution.mainus;
            res.json({event,data});
        });
    })
})

// router.get("/event/:id/interested",(req,res)=>{
//     let event = Event.findById(req.params.id);

// })

module.exports=router;