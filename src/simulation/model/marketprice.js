"use strict";

let MarketPriceSchema = require("../../schemas/marketpriceschema");

module.exports = class marketprice {

    constructor(name) {
        this.name = name;
        this.maxTotalProduction = 100;
        this.minTotalProduction = 0;
        this.electricityPrice = 0.4825; // 48.25 öre/kWh
        this.minElectricityPrice = 0;
        this.maxElectricityPrice = 50;
        this.maxTotalProduction = 0;
        this.currentProduction = 0;
        this.currentPrice = 0;
        this.manualControl = false;
    }

    setTotalProduction(totalProduction) {
        if (totalProduction >= this.maxProduction) {
            this.currentProduction = this.maxProduction;
        } else if (totalProduction < this.minProduction) {
            this.currentProduction = this.minProduction;
        } else {
            this.currentProduction += totalProduction;
        }
    }

    setMaxProduction(production) {
        this.maxTotalProduction += production;
    }

    getName() {
        return this.name;
    }

    getElectricityPrice() {
        return this.electricityPrice;
    }

    getCurrentPrice() {
        return this.currentPrice;
    }

    setMarketPrice() {
        if (this.currentPrice >= this.maxElectricityPrice) {
            this.currentPrice = this.maxElectricityPrice;
        } else if(this.currentPrice < this.minElectricityPrice) {
            this.currentPrice = this.minElectricityPrice;
        } else {
            this.currentPrice = 1 / (10 * (this.currentProduction / this.maxTotalProduction) * this.electricityPrice);
        }
    }

    setMarketPriceSchema() {
        this.marketPriceSchema = new MarketPriceSchema({
            timestamp: Date.now(),
            name: this.name,
            maxTotalProduction: this.maxTotalProduction,
            minTotalProduction: this.minTotalProduction,
            currentProduction: this.currentProduction,
            electricityPrice: this.electricityPrice,
            currentPrice: this.currentPrice
        });

        this.marketPriceSchema.save((err) => {
            if (err) throw err;

        });
    }

    status() {
        console.log("Region: " + this.name + ", market production: " +
            this.currentProduction.toPrecision(5) + "/" + this.maxTotalProduction.toPrecision(5) + " kWh " +
            ", current market price: " + this.currentPrice.toPrecision(3) + " öre/kWh " + "\n");
    }

    marketPrice() {
        if (!this.manualControl) {
            this.setMarketPrice();
        };

        // this.status();
        this.setMarketPriceSchema();
        if (!this.manualControl) {
            this.currentPrice = 0;
        };
        this.maxTotalProduction = 0;
        this.currentProduction = 0;
    }
}