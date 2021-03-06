"use strict";

let WindTurbine = require("./windturbine");
let Battery = require("./battery");
let MathExpression = require("./mathexpression");
let HouseSchema = require("../../schemas/houseschema");

module.exports = class house {

    constructor(powerPlant, marketPrice, region, owner, batteryCapacity, currBatteryCapacity) {
        this.owner = owner;
        this.region = region;
        this.battery = new Battery(owner, batteryCapacity, currBatteryCapacity);
        this.windTurbine = new WindTurbine(owner);
        this.powerPlant = powerPlant;
        this.marketPrice = marketPrice;
        this.mathExpression = new MathExpression();
        this.maxHouseConsumption = 1.35;
        this.minHouseConsumption = 0;
        this.houseConsumption = 914 / 744;
        this.conversionRate = 0.6;
        this.statusMessage = "FULLY OPERATIONAL";
        this.manualControl = false;
        this.blocked = false;
        this.blockCount = 0;
        this.storeBatteryRatio = 0.5;
        this.count = 0;
    }

    setHouseConsumption(consumption) {
        if (consumption >= this.maxHouseConsumption) {
            this.houseConsumption = this.maxHouseConsumption;
        } else if (consumption <= this.minHouseConsumption) {
            this.houseConsumption = this.minHouseConsumption;
        } else {
            this.houseConsumption = consumption;
        }
    }

    utilizePowerPlant() {
        if (this.windTurbine.getCurrentPower() < this.houseConsumption &&
            this.powerPlant.getCurrentProduction() >= 0) {
            this.powerPlant.battery.setCurrentCapacity(this.windTurbine.getCurrentPower() - this.houseConsumption);
        }
    }

    consumePowerPlantBattery() {
        if (this.powerPlant.getCurrentProduction() == 0 &&
            this.windTurbine.getCurrentPower() < this.houseConsumption &&
            this.powerPlant.battery.getCurrentCapacity() > 0) {
            this.powerPlant.battery.setCurrentCapacity(this.windTurbine.getCurrentPower() - this.houseConsumption);
        }
    }

    consumeLocalBattery() {
        if (this.powerPlant.getCurrentProduction() == 0 &&
            this.windTurbine.getCurrentPower() < this.houseConsumption &&
            this.powerPlant.battery.getCurrentCapacity() <= 0) {
            this.battery.setCurrentCapacity(this.windTurbine.getCurrentPower() - this.houseConsumption);
        }
    }

    blackoutCondition() {
        if (this.windTurbine.getBrokenStatus() == true) {
            this.statusMessage = "WIND TURBINE BROKEN";

        } else if (this.powerPlant.getCurrentProduction() == 0 &&
            this.powerPlant.battery.getCurrentCapacity() <= 0 &&
            this.windTurbine.getCurrentPower() < this.houseConsumption && this.battery.getCurrentCapacity() <= 0) {
            this.statusMessage = "BLACKOUT: POWER OUTAGE";

        } else if (this.powerPlant.getCurrentProduction() > 0 ||
            this.windTurbine.getCurrentPower() > this.houseConsumption || this.battery.getCurrentCapacity() > 0) {
            this.statusMessage = "FULLY OPERATIONAL";
        }
    }

    storeExcessPower() {
        if (this.windTurbine.getCurrentPower() > this.houseConsumption) {


            this.windTurbine.setExcessPower(this.houseConsumption);
            this.powerPlant.battery.setCurrentCapacity(this.windTurbine.getExcessPower() *
                this.conversionRate * this.storeBatteryRatio);
            this.battery.setCurrentCapacity(this.windTurbine.getExcessPower() *
                this.conversionRate * (1 - this.storeBatteryRatio));
        }
    }

    blockStatus() {
        if (this.blockCount > 9 && this.blocked) {
            this.storeBatteryRatio = 0.5;
            this.blockCount = 0;
            this.blocked = false;
        } else if (this.blocked) {
            this.statusMessage = "BLOCKED";
            this.storeBatteryRatio = 0.0;
            this.blockCount += 1;
        }
    }

    getOwner() {
        return this.owner;
    }

    getHouseConsumption() {
        return this.houseConsumption;
    }

    getregion() {
        return this.region.getName();
    }

    setHouseSchema() {
        this.houseSchema = new HouseSchema({
            timestamp: Date.now(),
            owner: this.owner,
            region: this.region.getName(),
            battery: this.battery,
            windTurbine: this.windTurbine,
            powerPlant: this.powerPlant.getName(),
            marketPrice: this.marketPrice,
            maxHouseConsumption: this.maxHouseConsumption,
            minHouseConsumption: this.minHouseConsumption,
            houseConsumption: this.houseConsumption,
            netProduction: this.windTurbine.getCurrentPower() - this.houseConsumption,
            batteryRatio: this.storeBatteryRatio,
            statusMessage: this.statusMessage
        });

        this.houseSchema.save((err) => {
            if (err) throw err;

        });
    }

    status() {
        console.log("House owner: " + this.owner + ", region: " + this.region.getName() +
            ", Wind speed: " + this.region.getWindSpeed().toPrecision(3) + " m/s," + " Temp: " +
            this.region.getTemp().toPrecision(3) + " °C," + " Status: " + this.statusMessage + "\n" +
            "Power output: " + this.windTurbine.getCurrentPower().toPrecision(3) + " kWh" +
            ", (Excess power " + this.windTurbine.getExcessPower().toPrecision(3) + ")" +
            ", Battery capacity: " + this.battery.getCurrentCapacity().toPrecision(3) + "/" +
            this.battery.getMaxCapacity().toPrecision(3) + " Ah" +
            ", House consumption: " + this.houseConsumption.toPrecision(3) + " kWh\n");
    }

    electricityConsumption() {
        this.windTurbine.windTurbineStatus(this.region.getWindSpeed());

        this.setHouseConsumption(this.houseConsumption *
            this.mathExpression.getTempIncrease(this.region.getTemp()) +
            this.mathExpression.normalDistribution(0, 0.10));

        // if statusmessage == blocked  
        this.storeExcessPower();

        this.marketPrice.setTotalProduction(this.windTurbine.getExcessPower() / 2);
        this.marketPrice.setMaxProduction(this.windTurbine.getMaxPower());

        this.utilizePowerPlant();
        this.consumePowerPlantBattery();
        this.consumeLocalBattery();
        this.blackoutCondition();

        if (this.statusMessage == "FULLY OPERATIONAL" && this.manualControl) {
            this.statusMessage += ": MANUAL CONTROL";
        };
        // this.status();

        this.blockStatus();

        this.setHouseSchema();

        if (this.statusMessage == "WIND TURBINE BROKEN") {
            this.windTurbine.currentPower = 0;
        }

        this.windTurbine.setExcessPowerZero();
    }
}