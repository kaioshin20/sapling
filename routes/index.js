const express      = require("express"),
      router       = express.Router(),
      passport     = require("passport"),
      bcrypt       = require("bcryptjs"),
      User         = require("../models/user"),
      googleAuth   = require("./auth/google"),
      facebookAuth = require("./auth/facebook");
      
router.get("/",(req,res)=>{
    res.redirect("/events"); 
});

//SHOW REGISTER FORM
router.get("/register",(req,res)=>{
    res.render("register");
});

//REGISTER LOGIC ROUTE
router.post("/register",async function(req,res){
    try{
        var salt = await bcrypt.genSaltSync(10);
        var hash = await bcrypt.hashSync(req.body.password, salt);
        let user = await User.create({
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            displayName:req.body.firstname + " " + req.body.lastname,
            email:req.body.email,
            password:hash,
            image:"https://res.cloudinary.com/image-storage/image/upload/v1572009434/blank-avatar_opbhgx.png"
        }); 

        req.logIn(user,function(err){  
            res.redirect("/events");
        });                   
    }
    catch(err){
        req.flash("error","This Email is already registered");
        res.redirect("/register");
    }    
});

//SHOW LOGIN FORM
router.get("/login",(req,res)=>{
    res.render("login");
});

//LOCAL LOGIN LOGIC ROUTE
router.post("/login",passport.authenticate("local",{ 
        failureRedirect:"/login",
        failureFlash:"Invalid email or password"
    }),(req,res)=>{
        res.redirect("/events");
});
 
//LOGOUT ROUTE
router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/login");
});

googleAuth(router);
facebookAuth(router);

module.exports=router;