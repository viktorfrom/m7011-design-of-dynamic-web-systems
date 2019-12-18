const express = require('express');
const router = express.Router();
const prompt = require('prompt');

const Region = require('../../schemas/regionschema');

prompt.start();

// get single region
router.get('/:regionId', async (req, res) => {
    try {
        const oneRegion = await Region.findById(req.params.regionId);
        res.json(oneRegion);
    } catch (err) {
        res.json({
            message: err
        });

    }
});

// get all regions
router.get('/', async (req, res) => {
    try {
        const allRegions = await Region.find();
        res.json(allRegions);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// post region
router.post('/', (req, res) => {
    const region = new Region({
        name: req.body.name,
        maxWindSpeed: req.body.maxWindSpeed,
        minWindSpeed: req.body.minWindSpeed,
        currentWindSpeed: req.body.currentWindSpeed,
        maxTemp: req.body.maxTemp,
        currentTemp: req.body.currentTemp
    })

    region.save().then(data => {
        res.json(data);
    });
});

// delete region
router.delete('/:regionId', async (req, res) => {
    try {
        const regionRemove = await Region.remove({
            _id: req.params.regionId
        });
        res.json(regionRemove);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// update region
router.patch('/:regionId', async (req, res) => {
    try {
        const regionUpdate = await Region.updateOne({
            _id: req.params.regionId
        }, {
            $set: {
                name: req.body.name,
                maxWindSpeed: req.body.maxWindSpeed,
                minWindSpeed: req.body.minWindSpeed,
                currentWindSpeed: req.body.currentWindSpeed,
                maxTemp: req.body.maxTemp,
                currentTemp: req.body.currentTemp
            }
        });
        res.json(regionUpdate);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;