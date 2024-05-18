const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Reviews = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const { isRef } = require("joi");

  const reviewController = require("../controllers/reviews.js");
  
   //post route
  router.post
    ("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));


    //Delete Route
    router.delete
    ("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));
 
 
module.exports = router;