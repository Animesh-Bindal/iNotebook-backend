const express = require('express')
const router = express.Router()
const User = require("../models/User");
const { query, validationResult, body } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
    '/createUser',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        let success = false;
        //If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req.body);
        // const user= new User(req.body);
        // user.save();
        // res.send(req.body);

        //Check whether userr with this email exists already or not
        try {
            // check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Sorry, a user with this email already exists." })
            }
            const salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, salt);

            // create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            // res.json(user);
            success = true;
            res.json({ success, authToken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occurred.");
        }
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log("Error is:" + err);
        //     res.json({ error: "Enter a unique value for email" ,message: err.message});
        // });
    }
);


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password can not be blank').exists()
    ],
    async (req, res) => {
        let success = false;
        //If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                success = false
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken });

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error");
        }
    }
);


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;