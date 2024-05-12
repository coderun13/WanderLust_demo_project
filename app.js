const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const user = require("./models/user.js");
const Reviews = require("./models/review.js");


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



  //root Route
  app.get("/", (req, res) => {
    res.send("Hi, I am root");
  });


  //format for schema validation
  const validatelisting = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400, result.errMsg);
    }else{
      next();
    }
  };


// //   //passport
// //   // app.use(passport.initialize());
// //   // app.use(passport.session());
// //   // passport.use(new LocalStrategy(user.authenticate()));

// //   // passport.serializeUser(user.serializeUser()); //storing data of user
// //   // passport.deserializeUser(user.deserializeUser()); //unstoring data of user


//Index Route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);
  

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});


  //Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  })
);


  //Create Route
app.post("/listings",validatelisting, 
  wrapAsync(async(req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

 // if(!req.body.listing){
  //   throw new ExpressError(400,"Send valid data for listing");

 // if(!req.body.listing.title){
    //   throw new ExpressError(400,"Title is missing");
    // }
    // if(!req.body.listing.description){
    //   throw new ExpressError(400,"Description is missing");
    // }
    // if(!req.body.listing.location){
    //   throw new ExpressError(400,"Location is missing");
    // }
  

  //Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);
  
  
  //Update Route
  app.put("/listings/:id",validatelisting,
   wrapAsync(async (req, res) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400,"Send valid data for listing");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);


  //Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);
  

//    //Reviews
//    //post route
//    app.post("/listings/:id/reviews", wrapAsync(async (req,res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);

//     Listing.reviews.puah(newReview);

//     await newReview.save();
//     await listing.save();

//     console.log("new review saved");
//     res.send("new review saved");
//    })
//   );


//  app.get("/testListing", async (req, res) => {
//    let sampleListing = new Listing({
//      title: "My New Villa",
//      description: "By the beach",
//      price: 1200,
//      location: "Calangute, Goa",
//      country: "India",
//    });

//    await sampleListing.save();
//    console.log("sample was saved");
//    res.send("successful testing");
//  });

app.all("*", (req,res,next)=>{
  next(new ExpressError(404,"Page not found!"));
});

 //custom error handling //express error handling
 app.use((err,req,res,next)=>{
  let{statusCode=500, message= "somthing went wrong!"}= err;
  res.status(statusCode).render("error.ejs",{ message });
 // res.status(statusCode).send(message);
  //res.send("something went wrong!");
 });


  app.listen(8080, () => {
    console.log("server is listening to port 8080");
  });