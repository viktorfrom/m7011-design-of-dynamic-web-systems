const express = require('express');
const router = express.Router();
const prompt = require('prompt');

const MarketPrice = require('../../schemas/marketpriceschema');

prompt.start();

// get single market price
router.get('/:marketPriceId', async (req, res) => {
    try {
        const oneMarketPrice = await MarketPrice.findById(req.params.marketPriceId);
        res.json(oneMarketPrice);
    } catch (err) {
        res.json({
            message: err
        });

    }
});

// get all market prices
router.get('/', async (req, res) => {
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
router.delete('/:marketPriceId', async (req, res) => {
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
router.patch('/:marketPriceId', async (req, res) => {

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