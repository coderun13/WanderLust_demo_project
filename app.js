const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));

  //root Route
  app.get("/", (req, res) => {
    res.send("Hi, I am root");
  });
  

//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  });
  


 /*app.get("/testListing", async (req, res) => {
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


  app.listen(8080, () => {
    console.log("server is listening to port 8080");
  });