const express = require('express');
const router = express.Router();
const prompt = require('prompt');
const moment = require('moment');

const auth = require('../../config/auth.js')
const PowerPlant = require('../../schemas/powerplantschema');

prompt.start();

// get single power plant
router.get('/:powerPlantId', auth.ensureAuthenticated, auth.check_user, async (req, res) => {
    try {
        const onePowerPlant = await PowerPlant.findById(req.params.powerPlantId);
        res.json(onePowerPlant);
    } catch (err) {
        res.json({
            message: err
        });

    }
});


// get 10 last power plants
router.get('/users/powerplants', auth.ensureAuthenticated, auth.check_user, async (req, res) => {
    try {
        // console.log(JSON.stringify(req.user));
        const powerPlants = await PowerPlant.find().sort({
            timestamp: -1
        }).limit(10);

        powerPlants.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            } else if (a.timestamp > b.timestamp) {
                return 1;
            }
            return 0;
        });

        const timestamp = powerPlants.map(x => moment(x.timestamp).format('YYYY-MM-DD hh:mm:ss'));
        const name = powerPlants.map(x => x.name);
        const region = powerPlants.map(x => x.region);

        const maxCapacity = powerPlants.map(x => x.battery.maxCapacity);
        const currentCapacity = powerPlants.map(x => x.battery.currentCapacity);

        const maxProduction = powerPlants.map(x => x.maxProduction);
        const currentProduction = powerPlants.map(x => x.currentProduction);
        const statusMessage = powerPlants.map(x => x.statusMessage);

        const result = {
            timestamp: timestamp,
            name: name,
            region: region,
            maxCapacity: maxCapacity,
            currentCapacity: currentCapacity,
            maxProduction: maxProduction,
            currentProduction: currentProduction,
            statusMessage: statusMessage
        };

        res.json(result);
    } catch (err) {
        res.json({
            message: err
        });
    }
    return;
});

// get all power plants
router.get('/', auth.ensureAuthenticated, auth.check_user, async (req, res) => {
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