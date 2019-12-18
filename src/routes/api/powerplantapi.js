const express = require('express');
const router = express.Router();
const prompt = require('prompt');

const PowerPlant = require('../../schemas/powerplantschema');

prompt.start();

// get single power plant
router.get('/:powerPlantId', async (req, res) => {
    try {
        const onePowerPlant = await PowerPlant.findById(req.params.powerPlantId);
        res.json(onePowerPlant);
    } catch (err) {
        res.json({
            message: err
        });

    }
});

// get all power plants
router.get('/', async (req, res) => {
    try {
        const allPowerPlants = await PowerPlant.find();
        res.json(allPowerPlants);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// post power plant
router.post('/', (req, res) => {
    const powerPlant = new PowerPlant({
        name: req.body.name,
        region: req.body.region,
        marketPrice: req.body.marketPrice,
        battery: req.body.battery,
        maxProduction: req.body.maxProduction,
        minProduction: req.body.minProduction,
        currentProduction: req.body.currentProduction,
        statusMessage: req.body.statusMessage,
    })

    powerPlant.save().then(data => {
        res.json(data);
    });
});

// delete powerplant 
router.delete('/:powerPlantId', async (req, res) => {
    try {
        const powerPlantRemove = await PowerPlant.remove({
            _id: req.params.powerPlantId
        });
        res.json(powerPlantRemove);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// update power plant
router.patch('/:powerPlantId', async (req, res) => {

    try {
        const powerPlantUpdate = await PowerPlant.updateOne({
            _id: req.params.powerPlantId
        }, {
            $set: {
                name: req.body.name,
                region: req.body.region,
                marketPrice: req.body.marketPrice,
                battery: req.body.battery,
                maxProduction: req.body.maxProduction,
                minProduction: req.body.minProduction,
                currentProduction: req.body.currentProduction,
                statusMessage: req.body.statusMessage,
            }
        });
        res.json(powerPlantUpdate);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;