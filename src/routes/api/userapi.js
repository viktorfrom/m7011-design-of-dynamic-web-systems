const express = require('express');
const router = express.Router();
const prompt = require('prompt');
const auth = require('../../config/auth.js')
const User = require('../../schemas/userschema');

prompt.start();

// get single house
router.get('/:userId', async (req, res) => {
    try {
        const oneUser = await Uesr.findById(req.params.userId);
        res.json(oneUser);
    } catch (err) {
        res.json({
            message: err
        });

    }
});

// get all houses
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


module.exports = router;