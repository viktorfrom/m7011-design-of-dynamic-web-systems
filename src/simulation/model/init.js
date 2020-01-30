"use strict";

let House = require("./house.js");
let PowerPlant = require("./powerplant.js");
let Region = require("./region.js");
let MarketPrice = require("./marketprice.js");

const bcrypt = require('bcrypt');
const User = require('../../schemas/userschema');

module.exports = class init {

    constructor() {
        this.marketPrice = new MarketPrice("GLE County");
        this.powerPlant;
        this.regions = [];
        this.houses = [];
        this.retrieveUsers = this.retrieveUsers.bind(this)
        this.simulationInterval;
    }

    async init() {
        console.log("Simulation running...");
        this.simulationInterval = setInterval(() => {
            this.powerPlant.electricityProduction();

            for (const region of this.regions) {
                region.windSpeed();
            }

            for (const house of this.houses) {
                house.electricityConsumption();
            }

            this.marketPrice.marketPrice(); // Needs to run last to get accurate readings.
        }, 3000);
    }

    async retrieveUsers() {
        try {
            await User.find().then(users => {

                // this.postAdmin();
                if (users.length == 0) {
                    this.regions.push(new Region("GLE-Region"));
                }

                if (users) {
                    for (const user of users) {
                        if (!this.regions.includes(user.region)) {
                            this.regions.push(new Region(user.region.toLowerCase()));
                        }
                    }
                }

                this.powerPlant = new PowerPlant("GLE Power Station", this.marketPrice, this.regions[0], 0, 500);

                if (users) {
                    for (const user of users) {
                        let regionObj = this.regions.filter(obj => obj.name == user.region.toLowerCase())

                        this.houses.push(new House(this.powerPlant, this.marketPrice, regionObj[0], user.email, 0, 5));
                    }
                }

                this.init();
            });
        } catch (err) {
            console.log(err)
        }
    }

    postAdmin() {
        const newUser = new User({
            timestamp: Date.now(),
            firstName: "Admin",
            lastName: "Admin",
            email: "admin@admin.com",
            role: "manager",
            password: "c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec",
            region: "GLE-Region",
            image: "../images/defaultUser.png"
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .catch(err => console.log(err));
            });
        });
    }

    stopInterval() {
        clearInterval(this.simulationInterval);
    }
}