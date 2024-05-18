const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validatelisting} = require("../middleware.js");

const ListingController = require("../controllers/listings.js");


//Index Route
router.get
  ("/", 
  wrapAsync(ListingController.index));
  

//New Route
router.get
  ("/new",
  isLoggedIn,ListingController.renderNewForm);


  //Show Route
router.get
  ("/:id",
  wrapAsync(ListingController.showListings));


  //Create Route
  router.post
  ("/",
  isLoggedIn,
  validatelisting, 
  wrapAsync(ListingController.createListing));


  //Edit Route
  router.get
  ("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.renderEditForm));


//Update Route
router.put
  ("/:id",
  isLoggedIn,
  isOwner,
  validatelisting,
  wrapAsync(ListingController.updateListing));


//Delete Route
router.delete
  ("/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.destroyListing));


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