const mongoose = require("mongoose");
const { object } = require("mongoose/lib/utils");
const { create } = require("./listing");
const { ref } = require("joi");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min:1,
        max:5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
});

const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;
