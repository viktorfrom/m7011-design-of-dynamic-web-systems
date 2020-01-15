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

        if (Math.sign(number)) {
            res.redirect('/dashboard/manager?production=true');
        } else {
            Simulation.init.powerPlant.maxProduction = parseInt(number, 10);

            if (!(Simulation.init.powerPlant.statusMessage == "START UP SEQUENCE INITIATED" ||
                    Simulation.init.powerPlant.statusMessage == "BLACKOUT: START UP SEQUENCE INITIATED" ||
                    Simulation.init.powerPlant.statusMessage == "BLACKOUT: SHUTDOWN SEQUENCE INITIATED")) {
                Simulation.init.powerPlant.currentProduction = parseInt(number, 10);
            }

            Simulation.init.powerPlant.manualControl = true;
        }

        res.redirect('/dashboard/manager?production=false');
    } catch (err) {
        res.json({
            message: err
        });
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

module.exports = router;