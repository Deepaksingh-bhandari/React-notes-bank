const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ThisisaJWTSECRETKey"
const fetchUser =require('../middleware/fetchuser')

// ROUTE1: POST API TO CREATE A USER
let userCreattionValidations = [body('name', "Enter a vaild name").isLength({ min: 5 }), body('email').isEmail(), body('password').isLength({ min: 5 })]
router.post('/createuser', userCreattionValidations, async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        // const user=new User(req.body)    //instance of model-in mongoose or document in mongodb
        // await user.save()    //it is creating duplicate records
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user)
                return res.status(400).json({ status: "failed ", msg: "User with this email already exists" })

            // Using Password mechanism along with Salt & Pepper methods - to store hash password in database 
            var salt = bcrypt.genSaltSync(10);
            var hashPassword = bcrypt.hashSync(req.body.password, salt);

            // Creating new user - new document in the User model
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            })
                .then((user) => {
                    const userData = {
                        user: { id: user.id }
                    }
                    // Providing JWT token to the user - AuthToken
                    const authToken = jwt.sign(userData, JWT_SECRET)
                    return res.status(200).json({ status: "success", userDetails: req.body, authToken })
                })
                .catch((err) => { return res.status(400).json({ status: "failed", mssg: err.mssg }) })
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ status: "failed", mssg: "Internal Server error occured" })
        }

    }
    else return res.status(400).json({ status: "failed", msg: errors.array() });
})

// ROUTE2: POST API TO Authenticate a user
let userLoginValidations = [body('email').isEmail().exists(), body('password').isLength({ min: 5 }).exists()]
router.post('/login', userLoginValidations, async (req, res) => {
    const { email, password } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "failed", msg: errors.array() })
    }
    else {
        try {
            // Checking if user exists already or not
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ status: "failed", msg: "Try to login with correct credentials" })
            }
            // Comparing user password in the database
            const pwdCompare = bcrypt.compareSync(password, user.password);
            if (!pwdCompare) {
                return res.status(400).json({ status: "failed", msg: "Try to login with correct credentials" })
            }


            // Providing JWT token to the user - AuthToken
            const userData = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(userData, JWT_SECRET)
            return res.status(200).json({ status: "success", msg: "Logged in successfully", authToken })

        }
        catch (err) {
            return res.status(500).json({ status: "Failure", msg: "Internal Server error occured" })
        }
    }
    
});

// ROUTE3: POST API TO Authenticate a user
router.post('/getUser',fetchUser, async (req, res) => {
    try {
        let userId = req.user.id
        let user = await User.findById(userId).select("-password");
        if (user) {
            return res.status(200).json({ status: "success", msg: "User Authenticated",user })  }  
            
            console.log("User Not present")
            return res.status(400).json({ status: "failure", msg: "Kindly Login Again" }) 

        
    } catch (error) {
        return res.status(500).json({ status: "failure", msg: "Internal Server error occured" })
    }
})

module.exports = router