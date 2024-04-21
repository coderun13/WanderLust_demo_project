const mongoose = require("mongoose");
const { object } = require("mongoose/lib/utils");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    /*image: {
        type: String,
        default: "nothing",
        set: (v)=> v=== ""? "default link": v,
    },*/
    price: Number,
    location: String,
    country: String,
});

const listing = mongoose.model("Listing",listingSchema);
module.exports = listing;



