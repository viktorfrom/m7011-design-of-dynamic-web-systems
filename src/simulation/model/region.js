'use strict';

let MathExpression = require("./mathexpression");
let RegionSchema = require("../../schemas/regionschema");

module.exports = class region {

    constructor(name) {
        this.name = name;
        this.mathExpression = new MathExpression();
        this.maxWindSpeed = 15;
        this.minWindSpeed = 0;
        this.currentWindSpeed = 5.2; 
        this.maxTemp = 0;
        this.currentTemp = -this.mathExpression.getRandomNum(20);
    }

    setWindSpeed(windSpeed) {
        if (windSpeed >= this.maxWindSpeed) {
            this.currentWindSpeed = this.maxWindSpeed;
        } else if (windSpeed <= this.minWindSpeed) {
            this.currentWindSpeed = this.minWindSpeed;
        } else {
            this.currentWindSpeed = windSpeed;
        }
    }

    setTemp(temp) {
        if (temp >= this.maxTemp) {
            this.currentTemp = this.maxTemp;
        } else if (temp <= this.minTemp) {
            this.currentTemp = this.minTemp;
        } else {
            this.currentTemp = temp;
        }
    }

    getName() {
        return this.name;
    }

    getWindSpeed() {
        return this.currentWindSpeed;
    }

    getTemp() {
        return this.currentTemp;
    }

    setRegionSchema() {
        this.regionSchema = new RegionSchema({
            timestamp: Date.now(),
            name: this.name,
            // mathExpression: this.mathExpression,
            maxWindSpeed: this.maxWindSpeed,
            minWindSpeed: this.minWindSpeed,
            currentWindSpeed: this.currentWindSpeed,
            maxTemp: this.maxTemp,
            currentTemp: this.currentTemp
        }); 

        this.regionSchema.save((err) => {
            if(err) throw err;

        });
    }
    
    status() {
        console.log("Region: " + this.name + ", wind speed: " + this.currentWindSpeed.toPrecision(3) + 
        " m/s " + "temp: " + this.currentTemp.toPrecision(3) + " °C" + "\n");
    }
    
    windspeed() {
        this.setWindSpeed(this.currentWindSpeed + this.mathExpression.normalDistribution(0, 0.1));
        this.setTemp(this.currentTemp + this.mathExpression.normalDistribution(0, 0.1));

        this.setRegionSchema();
        this.status();
    }
}
