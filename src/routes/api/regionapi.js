const express = require('express');
const router = express.Router();
const prompt = require('prompt');
const auth = require('../../config/auth.js')
const Region = require('../../schemas/regionschema');
const moment = require('moment');

prompt.start();

// // get single region
// router.get('/:regionId', auth.check_user, async (req, res) => {
//     try {
//         const oneRegion = await Region.findById(req.params.regionId);
//         res.json(oneRegion);
//     } catch (err) {
//         res.json({
//             message: err
//         });

//     }
// });

// get 10 last regions
router.get('/users/regions', auth.ensureAuthenticated, async (req, res) => {
    try {
        // console.log(JSON.stringify(req.user));
        const regions = await Region.find({ name: req.user.region.toLowerCase() }).sort({
            timestamp: -1
        }).limit(10);

        regions.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            } else if (a.timestamp > b.timestamp) {

                return 1;
            }
            return 0;
        });

        const timestamp = regions.map(x => moment(x.timestamp).format('YYYY-MM-DD hh:mm:ss'));
        const currentWindSpeed = regions.map(x => x.currentWindSpeed);
        const currentTemp = regions.map(x => x.currentTemp);

        const result = {
            timestamp: timestamp,
            currentWindSpeed: currentWindSpeed,
            currentTemp: currentTemp
        };

        res.json(result);
    } catch (err) {
        res.json({
            message: err
        });
    }
    return;
});

// get all regions
router.get('/', auth.check_user, async (req, res) => {
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