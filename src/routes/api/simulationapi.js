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

        console.log("test " + number);
        console.log("parse " + parseInt(number, 10));
        Simulation.init.powerPlant.maxProduction = parseInt(number, 10);

        if (!(Simulation.init.powerPlant.statusMessage == "START UP SEQUENCE INITIATED" ||
                Simulation.init.powerPlant.statusMessage == "BLACKOUT: START UP SEQUENCE INITIATED" ||
                Simulation.init.powerPlant.statusMessage == "BLACKOUT: SHUTDOWN SEQUENCE INITIATED")) {
                Simulation.init.powerPlant.currentProduction = parseInt(number, 10);
                console.log("asdasd")
        }

        Simulation.init.powerPlant.manualControl = true;

        // res.status(500).send({ error: "boo:(" });

        res.redirect('/dashboard/manager');
    } catch (err) {
        res.redirect('/dashboard/manager');
    }
});

router.post('/users/productionReset', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        Simulation.init.powerPlant.maxProduction = parseInt(30, 10);

        Simulation.init.powerPlant.statusMessage = "FULLY OPERATIONAL";
        Simulation.init.powerPlant.manualControl = false;

        res.redirect('/dashboard/manager');
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
        console.log("asdasd "  + number / 100);

        Simulation.init.powerPlant.storeBatteryRatio = parseFloat(number / 100, 10);
        Simulation.init.powerPlant.manualControl = true;


        res.redirect('/dashboard/manager');
    } catch (err) {
        res.redirect('/dashboard/manager');
    }
});

router.post('/users/electricityRatioReset', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        Simulation.init.powerPlant.storeBatteryRatio = parseFloat(0, 10);

        Simulation.init.powerPlant.statusMessage = "FULLY OPERATIONAL";
        Simulation.init.powerPlant.manualControl = false;

        res.redirect('/dashboard/manager');
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
        console.log("asdasd " + number);

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

        res.redirect('/dashboard/marketprice');
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/users/test', auth.ensureAuthenticated, async (req, res, next) => {
    try {
        const {
            number,
            userEmail
        } = req.body

        if (Math.sign(number) == -1 || number == "") {
            res.redirect('/dashboard/');
        } else {

            if (number >= 0.0 && number <= 1.0) {
                for (const house of Simulation.init.houses) {
                    if (house.owner == userEmail) {
                        house.storeBatteryRatio = parseFloat(number, 10);
                        house.manualControl = true;
                    }
                }
            } else {
                res.redirect('/dashboard/');
            }
        }

        res.redirect('/dashboard/prosumer');
    } catch (err) {
        res.redirect('/dashboard/');
    }
});

router.post('/users/testReset', auth.ensureAuthenticated, async (req, res, next) => {
    try {
        const {
            userEmail
        } = req.body

        for (const house of Simulation.init.houses) {
            if (house.owner == userEmail) {
                house.storeBatteryRatio = parseFloat(0, 10);
                house.manualControl = false;
            }
        }

        res.redirect('/dashboard/prosumer');
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;