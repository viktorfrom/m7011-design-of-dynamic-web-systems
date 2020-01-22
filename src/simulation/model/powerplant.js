"use strict";

let MathExpression = require("./mathexpression");
let Battery = require("./battery");
let PowerPlantSchema = require("../../schemas/powerplantschema");

module.exports = class powerplant {

    constructor(name, marketPrice, region, batteryCapacity, currBatteryCapacity) {
        this.name = name;
        this.marketPrice = marketPrice;
        this.region = region;
        this.battery = new Battery(name, batteryCapacity, currBatteryCapacity);
        this.mathExpression = new MathExpression();
        this.maxProduction = 30;
        this.minProduction = 0;
        this.currentProduction = 0;
        this.conversionRate = 0.6;
        this.acceleration = 1.5;
        this.storeBatteryRatio = 0.5;
        this.statusMessage = "";
        this.startUp = true;
        this.powerOutage = false;
        this.manualControl = false;
        this.count = 0;
    }

    setCurrentProduction(power) {
        if (power >= this.maxProduction) {
            this.currentProduction = this.maxProduction;
        } else if (power <= this.minProduction) {
            this.currentProduction = this.minProduction;
        } else {
            this.currentProduction = power;
            this.battery.setCurrentCapacity(power * this.conversionRate * this.storeBatteryRatio);
        }
    }

    PowerPlantStatus() {
        if (this.powerOutage == false) {
            this.setCurrentProduction(this.currentProduction + this.mathExpression.normalDistribution(0, 0.1));

            if (this.mathExpression.getRandomNum(100) <= 2) {
                this.statusMessage = "EMERGENCY SHUTDOWN SEQUENCE INITIATED";
                this.powerOutage = true;
            }

        } else if (this.powerOutage == true && this.count <= 10) {
            this.shutdownSeq();
            this.statusMessage = "EMERGENCY SHUTDOWN SEQUENCE INITIATED";
            this.count += 1;

        } else if (this.powerOutage == true && this.count >= 10) {
            this.startUpSeq();
            this.statusMessage = "EMERGENCY START UP SEQUENCE INITIATED";
            this.count += 1;

            if (this.count >= 20) {
                this.statusMessage = "FULLY OPERATIONAL";
                this.powerOutage = false;
                this.count = 0;
            }
        }
    }

    initStartUp() {
        if (this.startUp == true && this.count >= 0) {
            this.startUpSeq();
            this.statusMessage = "START UP SEQUENCE INITIATED";
            this.count += 1;

            if (this.count >= 10) {
                this.statusMessage = "FULLY OPERATIONAL";
                this.startUp = false;
                this.count = 0;
            }
        }
    }

    startUpSeq() {
        this.setCurrentProduction(this.currentProduction + this.acceleration +
            this.mathExpression.normalDistribution(0, 0.1));
    }

    shutdownSeq() {
        this.setCurrentProduction(this.currentProduction - this.acceleration +
            this.mathExpression.normalDistribution(0, 0.1));
    }

    getName() {
        return this.name;
    }

    getCurrentProduction() {
        return this.currentProduction;
    }

    setPowerPlantSchema() {
        this.powerPlantSchema = new PowerPlantSchema({
            timestamp: Date.now(),
            name: this.name,
            region: this.region.getName(),
            marketPrice: this.marketPrice,
            battery: this.battery,
            maxProduction: this.maxProduction,
            minProduction: this.minProduction,
            currentProduction: this.currentProduction,
            batteryRatio: this.storeBatteryRatio,
            statusMessage: this.statusMessage,
        });

        this.powerPlantSchema.save((err) => {
            if (err) throw err;

        });
    }

    status() {
        console.log("Power plant: " + this.name + ", Status: " + this.statusMessage + "\n" +
            "Current production = " + this.currentProduction.toPrecision(5) + " kWh" + ", Battery capacity: " +
            this.battery.getCurrentCapacity().toPrecision(3) + "/" + this.battery.getMaxCapacity().toPrecision(3) +
            " Ah" + "\n");
    }

    electricityProduction() {
        this.initStartUp();
        this.PowerPlantStatus();

        this.marketPrice.setTotalProduction(this.currentProduction);
        this.marketPrice.setMaxProduction(this.maxProduction);

        if (this.statusMessage == "FULLY OPERATIONAL" && this.manualControl) {
            this.statusMessage += ": MANUAL CONTROL";
        };

        this.setPowerPlantSchema();
        // this.startUpSeq();
        // this.shutdownSeq();
        // this.status();
    }
}