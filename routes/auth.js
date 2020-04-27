const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation }= require('../validation.js');


router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body); // this lane validate body
    if ( error ) return res.status(400).send(error.details[0].message) //what is wrong 

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try { 
        const savedUser = await user.save();
        res.send(savedUser);
    }catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;