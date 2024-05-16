const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Reviews = require("../models/review.js");


//format for review schema validation
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400, result.errMsg);
    }else{
      next();
    }
  };

  
   //post route
  router.post
  ("/",validateReview, wrapAsync(async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews (req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success","New Review created!");

  res.redirect(`/listings/${listing._id}`); 
   })
  );


module.exports = router;