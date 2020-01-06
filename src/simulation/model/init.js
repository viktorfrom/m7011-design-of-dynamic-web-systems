"use strict";

let House = require("./house.js");
let PowerPlant = require("./powerplant.js");
let Region = require("./region.js");
let MarketPrice = require("./marketprice.js");

const User = require('../../schemas/userschema');

module.exports = class init {

    constructor() {
        // this.marketPrice = new MarketPrice("Norrbotten");
        // this.region1 = new Region("Luleå");
        // this.region2 = new Region("Piteå");
        // this.region3 = new Region("Kalix");
        // this.region4 = new Region("Älvsbyn");
        // this.region5 = new Region("Boden");

        // this.powerPlant = new PowerPlant("Porjus vattenkraftstation", this.marketPrice, this.region1, 0, 30);

        // this.house1 = new House(this.powerPlant, this.marketPrice, this.region1, "Hasse", 2, 7);
        // this.house2 = new House(this.powerPlant, this.marketPrice, this.region2, "Agneta", 3, 10);
        // this.house3 = new House(this.powerPlant, this.marketPrice, this.region3, "Sten", 1, 7);

        // this.house4 = new House(this.powerPlant, this.marketPrice, this.region1, "Malin", 0, 0);
        // this.house5 = new House(this.powerPlant, this.marketPrice, this.region4, "Sara", 2, 5);
        // this.house6 = new House(this.powerPlant, this.marketPrice, this.region5, "Aron", 0, 0);

        this.timeSpan = 24 * 7;
    }

    async timespan(marketPrice, regions, powerPlant, houses) {
        console.log("Simulation running...");
        for (let i = 0; i < this.timeSpan; i++) {
            setTimeout(() => {
                // console.clear();
                // this.powerPlant.electricityProduction();

                // this.region1.windspeed();
                // this.region2.windspeed();
                // this.region3.windspeed();
                // this.region4.windspeed();
                // this.region5.windspeed();

                // this.house1.electricityConsumption();
                // this.house2.electricityConsumption();
                // this.house3.electricityConsumption();

                // this.house4.electricityConsumption();
                // this.house5.electricityConsumption();
                // this.house6.electricityConsumption();

                // this.marketPrice.marketPrice(); // Needs to run last to get accurate readings.

                powerPlant.electricityProduction();

                regions.forEach(function (region) {
                    region.windSpeed();
                });

                houses.forEach(function (house) {
                    house.electricityConsumption();
                });


                marketPrice.marketPrice(); // Needs to run last to get accurate readings.
            }, i * 10000)
        }
    }

    async retrieveUsers() {
        try {
            await User.find().then(users => {
                let marketPrice = new MarketPrice("Generic county");

                let regions = [];
                if (users) {
                    users.forEach(function (user) {
                        if (!regions.includes(user.region)) {
                            regions.push(new Region(user.region.toLowerCase()));
                        }
                    });
                }

                let powerPlant = new PowerPlant("Generic power station", marketPrice, regions[0], 0, 30);

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
}