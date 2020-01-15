const express = require('express');
const router = express.Router();
const prompt = require('prompt');
const auth = require('../../config/auth.js')
const Simulation = require('../../simulation/model/simulation.js');

prompt.start();

router.get('/users/productionControl', async (req, res) => {
    try {
        console.log(Simulation.init.powerPlant.maxProduction);
        Simulation.init.powerPlant.maxProduction = 0;
        console.log(Simulation.init.powerPlant.maxProduction);
        return res.json({
            message: 'test'
          });
    } catch (err) {
        res.json({
            message: err
        });

    }
});

module.exports = router;