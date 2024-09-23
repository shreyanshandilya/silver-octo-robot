const mongoose = require("mongoose")
const validator = require("validator") 

const userSchema = new mongoose.Schema({
    email : {
        type : String, 
        required : [true, 'A user must have an email'],
        unique : true, 
        lowercase : true, 
        validate : [validator.isEmail, 'Email invalid']
    },
    password : {
        type : String, 
        required : [true, 'A user must have a password'],
        select : false,
        minLength : [8, 'A password must be atleast 8 characters long']
    },
    passwordChangedAt : Date
})

const User = mongoose.model('User', userSchema)

module.exports = User;