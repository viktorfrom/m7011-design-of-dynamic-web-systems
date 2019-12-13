const express = require('express');
const router = express.Router();
const House = require('../schemas/houseschema');
const prompt = require('prompt');

prompt.start();

// routes
//get the request and respond
router.get('/', (req, res) => {
    prompt.get(["Owner", "Location"], function(err, result) {
        console.log('User entered ' + result.Owner + ' as the owner \n');
        console.log('User entered ' + result.Location + ' as location \n'); 
    })
});

router.get('/specific', (req, res) => {
    res.send('Specific post');
});

router.post('/', (req, res) => {
     const house = new House({
        powerPlant: req.body.powerPlant,
        marketPrice: req.body.marketPrice,
        location: req.body.location,
        owner: req.body.owner,
        batteryId: req.body.batteryId,
        windTurbineId: req.body.windTurbineId,
        maxHouseConsumption: req.body.maxHouseConsumption,
        minHouseConsumption: req.body.minHouseConsumption,
        houseConsumption: req.body.houseConsumption,
        statusMessage: req.body.statusMessage
     })
     house.save().then(data => {
         res.json(data);
     });
 });

module.exports = router;