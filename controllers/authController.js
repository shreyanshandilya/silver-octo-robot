const User = require("./../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.signupUser = async(req, res, next) => {
    try {
        email = req.body.email 
        password = req.body.password 
        confirm_password = req.body.confirmPassword

        if(password != confirm_password) {
            throw {
                "message" : "Password and confirm password do not match",
                "statusCode" : 500
            }
        }

        hashed_password = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            email : email,
            password : hashed_password
        })

        const token = jwt.sign({ id : newUser._id }, process.env.JWT_SECRET, {
            expiresIn : process.env.JWT_EXPIRES_IN
        })

        res.status(201).json({
            "status" : "success",
            "data" : {
                token, 
                "user" : newUser
            }
        })
    }

    catch(error) {
        next(error);
    }
}

exports.loginUser = async(req, res, next) => {
    try {
        email = req.body.email 
        password = req.body.password 

        if(!email || !password) {
            throw {
                "message" : "Email or password does not exist."
            }
        }

        const user = await User.findOne({ email }).select('+password')

        if(!user) {
            throw {
                "message" : "User does not exist or username or password is incorrect",
                "status" : 401
            }
        }

        const correct = await bcrypt.compare(password, user.password)

        if(!correct) {
            throw {
                "message" : "User does not exist or username or password is incorrect.",
                "status" : 401
            }
        }

        const token = jwt.sign({ id : user._id} , process.env.JWT_SECRET, {
            expiresIn : process.env.JWT_EXPIRES_IN
        })

        res.status(200).json({
            "status" : "success",
            "data" : {
                token
            }
        })

    }
    catch (error) {
        next(error)
    }
}