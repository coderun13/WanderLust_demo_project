const mongoose = require("mongoose");
const { object, buffer } = require("mongoose/lib/utils");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        // default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        set: (v)=> v=== ""? "https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
        type: Schema.Types.ObjectId,
        ref: "Review",
    },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});


//post mongoose middleware
listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});


const listing = mongoose.model("Listing",listingSchema);
module.exports = listing;



