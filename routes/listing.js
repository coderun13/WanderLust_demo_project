const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js")


//format for schema validation
const validatelisting = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400, result.errMsg);
    } else {
      next();
    }
  };


//Index Route
router.get
    ("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);
  

//New Route
router.get
    ("/new", isLoggedIn,(req, res) => {     
  res.render("listings/new.ejs");
});


  //Show Route
router.get
    ("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for doest not exist!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

  //Create Route
  router.post
    ("/",
    isLoggedIn,
    validatelisting, 
    wrapAsync(async(req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");
  })
);


  //Edit Route
  router.get
  ("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for doest not exist!");
    res.redirect("/listings");
  }
  req.flash("success","Listing Edited!");
  res.render("listings/edit.ejs", { listing });
})
);



//Update Route
router.put
  ("/:id",
  isLoggedIn,
  validatelisting,
   wrapAsync(async (req, res) => {
  // if(!req.body.listing){
  //   throw new ExpressError(400,"Send valid data for listing");
  // }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","Listing Updated!");
  res.redirect(`/listings/${id}`);
})
);


//Delete Route
router.delete
  ("/:id",
  isLoggedIn,
   wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted!");
  console.log(deletedListing);
  res.redirect("/listings");
})
);


 //error Handling

    // if(!req.body.listing){
    //  throw new ExpressError(400,"Send valid data for listing");
    // if(!req.body.listing.title){
    //   throw new ExpressError(400,"Title is missing");
    // }
    // if(!req.body.listing.description){
    //   throw new ExpressError(400,"Description is missing");
    // }
    // if(!req.body.listing.location){
    //   throw new ExpressError(400,"Location is missing");
    // }


module.exports = router;