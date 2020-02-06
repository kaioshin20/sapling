const express      = require("express"),
      router       = express.Router(),
      passport     = require("passport"),
      bcrypt       = require("bcryptjs"),
      User         = require("../models/user"),
      googleAuth   = require("./auth/google"),
      facebookAuth = require("./auth/facebook");
      
// router.get("/",(req,res)=>{
//     res.redirect("/events"); 
// });

router.get("/register",(req,res)=>{
    res.render("register");
})

//REGISTER LOGIC ROUTE
router.post("/register",async function(req,res){
    try{
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        let user = await User.create({
            displayName:req.body.name,
            email:req.body.email,
            password:hash,
            location:req.body.location,
            contact:req.body.contact,
            image:"https://res.cloudinary.com/image-storage/image/upload/v1572009434/blank-avatar_opbhgx.png"
        }); 
        console.log(user);
        res.send({user});
        // req.logIn(user,function(err){  
        //     res.status(200).send({user});
        // });                   
    }
    catch(err){
        res.status(505);
    }    
});

//LOCAL LOGIN LOGIC ROUTE
router.post("/login",passport.authenticate("local"),(req,res)=>{
    let userInfo = req.user;    
    res.status(200).send(userInfo);
});
 
//LOGOUT ROUTE
router.get("/logout",(req,res)=>{
    req.logOut();
    res.status(200);
});

// googleAuth(router);
// facebookAuth(router);

module.exports=router;