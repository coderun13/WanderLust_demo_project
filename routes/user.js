const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});


router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new user({email,username,password});
        const registeredUser = await user.register(newUser,password);
        console.log(registeredUser);
        req.flash("success","Welcome to WanderLust!");
        res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    };
   
}));


router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});


router.post(
    "/login", 
      passport.authenticate("local",
      { failureRedirect: '/login', 
      failureFlash: true
   }),
      async(req,res)=>{
          req.flash("success","Welcome back to WanderLust!");
          res.redirect("/listings");
      }
  );


module.exports = router;