const express = require('express');
const router = express.Router();
const prompt = require('prompt');

const House = require('../schemas/houseschema');

prompt.start();

router.get('/', async (req, res) => {
    try {
        const houses = await House.find();
        res.json(houses);
    } catch (err) {
        res.json({message: err});
        
    }
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