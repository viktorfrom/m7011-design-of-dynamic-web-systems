"use strict";

const gaussian = require('gaussian');

module.exports = class mathexpression {

    constructor() {}

    // Normal distrubution, N(µ, σ), where µ = 0 and σ^2 = 1,
    // if set to N(0, 1), yields high rate to return 1.
    normalDistribution(mean, constiance) {
        const distribution = gaussian(mean, constiance);

        return distribution.ppf(Math.random());
    }

    // Input smaller or eq to 1 will only return 0.
    getRandomNum(int) {
        let randomNum = Math.random();

        return Math.floor(randomNum * int);
    }

    getTempIncrease(temp) {
        let increase = Math.abs(temp)/100

        return (1 + increase);
    }
}
