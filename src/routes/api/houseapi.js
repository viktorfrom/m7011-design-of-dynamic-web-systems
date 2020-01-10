const express = require('express');
const router = express.Router();
const prompt = require('prompt');
const auth = require('../../config/auth.js')
const House = require('../../schemas/houseschema');
const moment = require('moment');

prompt.start();

// // get single house
// router.get('/:houseId', async (req, res) => {
//     try {
//         const oneHouse = await House.findById(req.params.houseId);
//         res.json(oneHouse);
//     } catch (err) {
//         res.json({
//             message: err
//         });

//     }
// });

// // get single house
// router.get('/users/current', auth.ensureAuthenticated, async (req, res) => {
//     try {
//         // console.log(JSON.stringify(req.user));
//         const oneHouse = await House.findOne({
//             owner: req.user.email
//         }).sort({
//             timestamp: -1
//         });
//         res.json(oneHouse);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

// get 10 last houses
router.get('/users/houses', auth.ensureAuthenticated, async (req, res) => {
    try {
        // console.log(JSON.stringify(req.user));
        const houses = await House.find({
            owner: req.user.email
        }).sort({
            timestamp: -1
        }).limit(10);

        houses.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            } else if (a.timestamp > b.timestamp) {

                return 1;
            }
            return 0;
        });

        const timestamp = houses.map(x => moment(x.timestamp).format('YYYY-MM-DD hh:mm:ss'));
        
        const maxCapacity = houses.map(x => x.battery.maxCapacity);
        const currentCapacity = houses.map(x => x.battery.currentCapacity);

        const currentPower = houses.map(x => x.windTurbine.currentPower);
        const maxPower = houses.map(x => x.windTurbine.maxPower);

        const maxHouseConsumption = houses.map(x => x.maxHouseConsumption);
        const houseConsumption = houses.map(x => x.houseConsumption);
        const netProduction = houses.map(x => x.netProduction);
        const statusMessage = houses.map(x => x.statusMessage);

        const result = {
            timestamp: timestamp,

            maxCapacity: maxCapacity,
            currentCapacity: currentCapacity,

            currentPower: currentPower,
            maxPower: maxPower,
            
            maxHouseConsumption: maxHouseConsumption,
            houseConsumption: houseConsumption,
            netProduction: netProduction,
            statusMessage: statusMessage
        };


        // const timestamp = houses.map(x => moment(x.timestamp).format('YYYY-MM-DD hh:mm:ss'));
        
        // const maxCapacity = house.map(x => x.battery.maxCapacity);
        // const currentCapacity = house.map(x => x.battery.currentCapacity);

        // const currentPower = houses.map(x => x.windTurbine.currentPower);
        // const maxPower = houses.map(x => x.windTurbine.maxPower);

        // const houseConsumption = houses.map(x => x.houseConsumption);
        // const netProduction = houses.map(x => x.netProduction);
        // const statusMessage = houses.map(x => x.statusMessage);

        // const result = {
        //     timestamp: timestamp,

        //     maxCapacity: maxCapacity,
        //     currentCapacity: currentCapacity,

        //     currentPower: currentPower,
        //     maxPower: maxPower,
            
        //     houseConsumption: houseConsumption,
        //     netProduction: netProduction,
        //     statusMessage: statusMessage
        // };



        res.json(result);
    } catch (err) {
        res.json({
            message: err
        });
    }
    return;
});


// get all houses
router.get('/', auth.ensureAuthenticated, async (req, res) => {
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
        region: req.body.region,
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
                region: req.body.region,
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