const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = "mynameisherererjsdfhjdsfs"


const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('password')
        .notEmpty().withMessage('Password is required')

        .withMessage('Password must contain at least one number and one special character and be at least 8 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('location').notEmpty().withMessage('Location is required')
];

router.post("/createuser", validateUser, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const salt = await bcrypt.genSalt(10);
    let securepassword = await bcrypt.hash(req.body.password, salt)
    try {
        await User.create({
            name: req.body.name,
            password: securepassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

const validateUserLogin = [
    body('password')
        .notEmpty().withMessage('Password is required')

        .withMessage('Password must contain at least one number and one special character and be at least 8 characters long'),
    body('email').isEmail().withMessage('Invalid email address')
];

router.post("/loginuser", validateUserLogin, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: [{ msg: "Invalid email or password" }] });
        }
        const pwdpasswordcompaire = await bcrypt.compare(req.body.password, userData.password);

        if (pwdpasswordcompaire) {
            const data = {
                user: {
                    id: userData.id,
                    name: userData.name,
                    location: userData.location,
                    email: userData.email,
                }
            }
            const authtoken = jwt.sign(data, jwtsecret)

            res.json({ success: true, authtoken: authtoken ,name: userData.name, email:userData.email, location: userData.location });
        } else {
            return res.status(400).json({ errors: [{ msg: "Invalid email or password" }] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
});


module.exports = router;
