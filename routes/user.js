const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");


const UserController = require("../controllers/users.js");


router.get("/signup",UserController.renderSignupForm);


router.post("/signup",
wrapAsync(UserController.signup));


router.get("/login",UserController.renderLoginForm);


router.post(
    "/login", 
    saveRedirectUrl,
      passport.authenticate("local",
      { failureRedirect: '/login', 
      failureFlash: true
   }),
   UserController.login
  );


  router.get("/logout",UserController.logout);


module.exports = router;