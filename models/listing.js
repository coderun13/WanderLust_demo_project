const mongoose = require("mongoose");
const { object } = require("mongoose/lib/utils");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "nothing",
        set: (v)=> v=== ""? "https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
        type:Schema.Types.ObjectId,
        ref: "Review"
    }
    ]
});

const listing = mongoose.model("Listing",listingSchema);
module.exports = listing;



