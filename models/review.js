const mongoose = require("mongoose");
const { object } = require("mongoose/lib/utils");
const { create } = require("./listing");
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
    }
});
