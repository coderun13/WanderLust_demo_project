const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");


//require routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


//mongodb setup
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; 


//database connection
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
  
async function main() {
    await mongoose.connect(MONGO_URL);
  }

  
  //path setup
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));
  app.engine("ejs",ejsmate);
  app.use(express.static(path.join(__dirname, "/public")));


  //sessionOption  
  const  sessionOptions = {
    secret: "mysecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //days*hrs*min*sec*millisec
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
};


  //root Route
  app.get("/", (req, res) => {
    res.send("Hi, I am root");
  });


 //session
  app.use(session(sessionOptions));
  app.use(flash());


 






 //demo user







  //routes
  app.use("/listings",listings);
  app.use("/listings/:id/reviews",reviews);



 //sample data to test
 /*  app.get("/testListing", async (req, res) => {
   let sampleListing = new Listing({
     title: "My New Villa",
     description: "By the beach",
     price: 1200,
     location: "Calangute, Goa",
     country: "India",
   });

   await sampleListing.save();
   console.log("sample was saved");
   res.send("successful testing");
 });*/


  //error handling for invalid routes
  app.all("*", (req,res,next)=>{
  next(new ExpressError(404,"Page not found!"));
  });


 //custom error handling //express error handling
 app.use((err,req,res,next)=>{
  let{statusCode=500, message= "somthing went wrong!"}= err;
  res.status(statusCode).render("../views/listings/error.ejs",{ message });
 // res.status(statusCode).send(message);
  //res.send("something went wrong!");
 });


 //port setup
  app.listen(8080, () => {
    console.log("server is listening to port 8080");
  });