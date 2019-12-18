const express = require('express');
const router = express.Router();
const prompt = require('prompt');

const House = require('../../schemas/houseschema');

prompt.start();

// get single house
router.get('/:houseId', async (req, res) => {
    try {
        const oneHouse = await House.findById(req.params.houseId);
        res.json(oneHouse);
    } catch (err) {
        res.json({
            message: err
        });

    }
});

// get all houses
router.get('/', async (req, res) => {
    try {
        const allHouses = await House.find();
        res.json(allHouses);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


// post house
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

// delete house 
router.delete('/:houseId', async (req, res) => {
    try {
        const houseRemove = await House.remove({
            _id: req.params.houseId
        });
        res.json(houseRemove);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// update house
router.patch('/:houseId', async (req, res) => {
    try {
        const houseUpdate = await House.updateOne({
            _id: req.params.houseId
        }, {
            $set: {
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
            }
        });
        res.json(houseUpdate);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;