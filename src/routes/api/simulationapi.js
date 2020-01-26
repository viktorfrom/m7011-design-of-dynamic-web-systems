const express = require('express');
const router = express.Router();
const prompt = require('prompt');
const auth = require('../../config/auth.js')
const Simulation = require('../../simulation/model/simulation.js');

prompt.start();

router.post('/users/productionControl', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        const {
            number
        } = req.body

        const statusMessage = Simulation.init.powerPlant.statusMessage;

        if (statusMessage == "START UP SEQUENCE INITIATED" ||
            statusMessage == "EMERGENCY START UP SEQUENCE INITIATED" ||
            statusMessage == "EMERGENCY SHUTDOWN SEQUENCE INITIATED" ||
            statusMessage == "SHUTDOWN SEQUENCE INITIATED") {

            res.redirect('/dashboard/powerplant?sequence=true');

        } else if (statusMessage == "POWER PLANT OFFLINE") {
            res.redirect('/dashboard/powerplant?offline=true');

        } else {
            Simulation.init.powerPlant.maxProduction = parseInt(number, 10);
            Simulation.init.powerPlant.currentProduction = parseInt(number, 10);
            Simulation.init.powerPlant.manualControl = true;
        }

        // res.status(500).send({ error: "boo:(" });

        res.redirect('/dashboard/powerplant');
    } catch (err) {
        res.redirect('/dashboard/powerplant');
    }
});

router.post('/users/productionReset', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        Simulation.init.powerPlant.maxProduction = parseInt(30, 10);

        Simulation.init.powerPlant.statusMessage = "FULLY OPERATIONAL";
        Simulation.init.powerPlant.manualControl = false;

        res.redirect('/dashboard/powerplant');
    } catch (err) {
        res.json({
            message: err
        });
    }
});


router.post('/users/productionShutdown', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {

        const statusMessage = Simulation.init.powerPlant.statusMessage;

        if (statusMessage == "START UP SEQUENCE INITIATED" ||
            statusMessage == "EMERGENCY START UP SEQUENCE INITIATED" ||
            statusMessage == "EMERGENCY SHUTDOWN SEQUENCE INITIATED" ||
            statusMessage == "SHUTDOWN SEQUENCE INITIATED") {

            res.redirect('/dashboard/powerplant?sequence=true');
        } else if (statusMessage == "POWER PLANT OFFLINE") {
            res.redirect('/dashboard/powerplant?offline=true');

        } else {
            Simulation.init.powerPlant.manualShutdown = true;
        }

        res.redirect('/dashboard/powerplant');
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/users/productionStartUp', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {

        const statusMessage = Simulation.init.powerPlant.statusMessage;

        if (statusMessage == "START UP SEQUENCE INITIATED" ||
            statusMessage == "EMERGENCY START UP SEQUENCE INITIATED" ||
            statusMessage == "EMERGENCY SHUTDOWN SEQUENCE INITIATED" ||
            statusMessage == "SHUTDOWN SEQUENCE INITIATED") {

            res.redirect('/dashboard/powerplant?sequence=true');
        } else if (statusMessage == "FULLY OPERATIONAL") {
            res.redirect('/dashboard/powerplant?operational=true');

        } else {
            Simulation.init.powerPlant.manualStartUp = true;
        }

        res.redirect('/dashboard/powerplant');
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/users/electricityRatio', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        const {
            number
        } = req.body

        Simulation.init.powerPlant.storeBatteryRatio = parseFloat(number / 100, 10);
        Simulation.init.powerPlant.manualControl = true;


        res.redirect('/dashboard/powerplant');
    } catch (err) {
        res.redirect('/dashboard/powerplant');
    }
});

router.post('/users/electricityRatioReset', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        Simulation.init.powerPlant.storeBatteryRatio = parseFloat(0.5, 10);

        Simulation.init.powerPlant.statusMessage = "FULLY OPERATIONAL";
        Simulation.init.powerPlant.manualControl = false;

        res.redirect('/dashboard/powerplant');
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/users/marketPriceControl', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        const {
            number
        } = req.body

        Simulation.init.marketPrice.maxElectricityPrice = parseInt(number, 10);
        Simulation.init.marketPrice.currentPrice = parseInt(number, 10);
        Simulation.init.marketPrice.manualControl = true;

        res.redirect('/dashboard/marketprice');
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/users/marketPriceReset', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        Simulation.init.marketPrice.maxElectricityPrice = parseInt(100, 10);
        Simulation.init.marketPrice.manualControl = false;

        res.redirect('/dashboard/markcetprice');
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/users/houseElectricityRatio', auth.ensureAuthenticated, async (req, res, next) => {
    try {
        const {
            number,
            userEmail
        } = req.body

        for (const house of Simulation.init.houses) {
            if (house.owner == userEmail) {
                house.storeBatteryRatio = parseFloat(number / 100, 10);
                house.manualControl = true;
            }
        }

        res.redirect('/dashboard/');
    } catch (err) {
        res.redirect('/dashboard/');
    }
});

router.post('/users/resetHouseElectricityRatio', auth.ensureAuthenticated, async (req, res, next) => {
    try {
        const {
            userEmail
        } = req.body

        for (const house of Simulation.init.houses) {
            if (house.owner == userEmail) {
                house.storeBatteryRatio = parseFloat(0.5, 10);
                house.manualControl = false;
            }
        }

        res.redirect('/dashboard/');
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;