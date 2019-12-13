'use strict';

let MathExpression = require("./mathexpression");

module.exports = class windturbine {

    constructor(owner) {
        this.owner = owner;
        this.mathExpression = new MathExpression();
        this.maxPower = 1.5;
        this.minPower = 0;
        this.currentPower = 0; 
        this.excessPower = 0;
        this.conversionRate = 4.2;
        this.broken = false;
        this.count = 0;
    }

    windTurbineStatus(windSpeed) {
        if (this.broken == false && this.count <= 5) {
            this.setCurrentPower(windSpeed / this.conversionRate + 
                this.mathExpression.normalDistribution(0, 0.01));

            if (this.mathExpression.getRandomNum(100) <= 2) {
                this.setCurrentPower(0);
                this.excessPower = 0;
                this.broken = true;
            }

        } else if (this.broken == true) {
            this.count += 1;

            if (this.count >= 5) {

                this.setCurrentPower(windSpeed /
                    this.conversionRate + this.mathExpression.normalDistribution(0, 0.01));
                this.broken = false;
                this.count = 0;
            }
        }
    }

    setCurrentPower(power) {
        if (power >= this.maxPower) {
            this.currentPower = this.maxPower;
        } else if (power <= this.minPower) {
            this.currentPower = this.minPower;
        } else {
            this.currentPower = power;
        }
    }

    setBrokenStatus(status) {
        if (status) {
            this.broken = true;
        } else if (!status) {
            this.broken = false;
        }
    }

    setExcessPower(houseConsumption) {
        if (this.currentPower > houseConsumption) {
            this.excessPower = this.currentPower - houseConsumption;
        }
    }

    setExcessPowerZero() {
        this.excessPower = 0;
    }

    getOwner() {
        return this.owner;
    }

    getCurrentPower() {
        return this.currentPower;
    }
    
    getExcessPower() {
        return this.excessPower;
    }
    
    getMaxPower() {
        return this.maxPower;
    }

    getBrokenStatus() {
        return this.broken;
    }
}
