"use strict";

let House = require("./house.js");
let PowerPlant = require("./powerplant.js");
let Region = require("./region.js");
let MarketPrice = require("./marketprice.js");

const User = require('../../schemas/userschema');

module.exports = class init {

    constructor() {
        this.timeSpan = 24 * 10000;
        this.simulationInterval;
    }

    async timespan(marketPrice, regions, powerPlant, houses) {
        console.log("Simulation running...");
        this.simulationInterval = setInterval(() => {
            powerPlant.electricityProduction();

            regions.forEach(function (region) {
                region.windSpeed();
            });

            houses.forEach(function (house) {
                house.electricityConsumption();
            });

            marketPrice.marketPrice(); // Needs to run last to get accurate readings.
        }, 3000);
    }

    async retrieveUsers() {
        try {
            await User.find().then(users => {
                let marketPrice = new MarketPrice("GLE County");

                let regions = [];

                if (users.length == 0) {
                    regions.push(new Region("GLE-Region"));
                }

                if (users) {
                    users.forEach(function (user) {
                        if (!regions.includes(user.region)) {
                            regions.push(new Region(user.region.toLowerCase()));
                        }
                    });
                }

                let powerPlant = new PowerPlant("GLE Power Station", marketPrice, regions[0], 0, 30);

                let houses = [];
                if (users) {
                    users.forEach(function (user) {
                        let regionObj = regions.filter(obj => obj.name == user.region.toLowerCase())

                        houses.push(new House(powerPlant, marketPrice, regionObj[0], user.email, 0, 5));
                    });
                }

                // console.log(marketPrice);
                // console.log(regions);
                // console.log(powerPlant);
                // console.log(houses);
                this.timespan(marketPrice, regions, powerPlant, houses);
            });
        } catch (err) {
            console.log("Error: user db appears to be empty!")
        }
    }
    stopInterval() {
        clearInterval(this.simulationInterval);
    }
}