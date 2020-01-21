const express = require('express');
const router = express.Router();
const prompt = require('prompt');
const moment = require('moment');

const auth = require('../../config/auth.js')
const MarketPrice = require('../../schemas/marketpriceschema');

prompt.start();

// // get single market price
router.get('/:marketPriceId', auth.ensureAuthenticated ,auth.check_user, async (req, res) => {
    try {
        const oneMarketPrice = await MarketPrice.findById(req.params.marketPriceId);
        res.json(oneMarketPrice);
    } catch (err) {
        res.json({
            message: err
        });

    }
});

// get latest market price value
router.get('/users/latestMarketPriceValue', auth.ensureAuthenticated, auth.check_user, async (req, res) => {
    try {
        const marketPrices = await MarketPrice.find().sort({
            timestamp: -1
        }).limit(10);

        marketPrices.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            } else if (a.timestamp > b.timestamp) {
                return 1;
            }
            return 0;
        });

        const currentPrice = marketPrices.map(x => x.currentPrice);

        const result = {
            currentPrice: Math.floor(currentPrice[9])
        };

        res.json(result);
    } catch (err) {
        res.json({
            message: err
        });
    }
    return;
});

// get 10 last market prices
router.get('/users/marketprices', auth.ensureAuthenticated, async (req, res) => {
    try {
        // console.log(JSON.stringify(req.user));
        const marketPrices = await MarketPrice.find().sort({
            timestamp: -1
        }).limit(10);

        marketPrices.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            } else if (a.timestamp > b.timestamp) {
                return 1;
            }
            return 0;
        });

        const timestamp = marketPrices.map(x => moment(x.timestamp).format('YYYY-MM-DD hh:mm:ss'));
        const maxTotalProduction = marketPrices.map(x => x.maxTotalProduction);
        const currentProduction = marketPrices.map(x => x.currentProduction);
        const currentPrice = marketPrices.map(x => x.currentPrice);

        const result = {
            timestamp: timestamp,
            maxTotalProduction: maxTotalProduction,
            currentProduction: currentProduction,
            currentPrice: currentPrice
        };

        res.json(result);
    } catch (err) {
        res.json({
            message: err
        });
    }
    return;
});

// get all market prices
router.get('/', auth.ensureAuthenticated, auth.check_user, async (req, res) => {
    try {
        const allMarketPrices = await MarketPrice.find();
        res.json(allMarketPrices);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// post market price
router.post('/', (req, res) => {
    const marketPrice = new MarketPrice({
        name: req.body.name,
        maxTotalProduction: req.body.maxTotalProduction,
        minTotalProduction: req.body.minTotalProduction,
        currentTotalProduction: req.body.currentTotalProduction,
        electricityPrice: req.body.electricityPrice,
        currentPrice: req.body.currentPrice
    })

    marketPrice.save().then(data => {
        res.json(data);
    });
});

// delete market price
router.delete('/:marketPriceId', auth.ensureAuthenticated, auth.check_user, async (req, res) => {
    try {
        const marketPriceRemove = await MarketPrice.remove({
            _id: req.params.marketPriceId
        });
        res.json(marketPriceRemove);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// update market price
router.patch('/:marketPriceId', auth.ensureAuthenticated, auth.check_user, async (req, res) => {

    try {
        const marketPriceUpdate = await MarketPrice.updateOne({
            _id: req.params.marketPriceId
        }, {
            $set: {
                name: req.body.name,
                maxTotalProduction: req.body.maxTotalProduction,
                minTotalProduction: req.body.minTotalProduction,
                currentTotalProduction: req.body.currentTotalProduction,
                electricityPrice: req.body.electricityPrice,
                currentPrice: req.body.currentPrice
            }
        });
        res.json(marketPriceUpdate);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;