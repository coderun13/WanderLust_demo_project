const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose"); 

//email
const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    }
})

User.plugin(passportLocalMongoose); 
//This plugin add usernane ,hash and salt field to store the username,the hashed password and the salt value.

module.exports = mongoose.model("user",userSchema);