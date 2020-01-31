const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      cors                  = require("cors"),
      methodOverride        = require("method-override"),
      middleware            = require("./middleware/index");

require("dotenv").config();

//ROUTES
const indexRoute         = require("./routes/index"),
      eventRoute         = require("./routes/event"),
      resetPasswordRoute = require("./routes/resetPass"),
      userRoute          = require("./routes/user"),
      notificationRoute  = require("./routes/notification");

mongoose.connect(process.env.DATABASEURL,{ useUnifiedTopology: true ,useNewUrlParser:true});
mongoose.set("useFindAndModify",false);
mongoose.set("useCreateIndex",true);

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(cors());

middleware(app);

app.use("/",indexRoute);
app.use("/",resetPasswordRoute);
app.use("/events",eventRoute);
app.use("/user",userRoute);
app.use("/notification",notificationRoute);

app.listen(process.env.PORT||5000)
{
    console.log("Server has started");
}