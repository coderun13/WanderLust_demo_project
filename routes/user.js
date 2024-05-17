const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});



module.exports = router;