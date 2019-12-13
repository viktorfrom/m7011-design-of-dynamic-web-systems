"use strict";

let WindTurbine = require("./windturbine");
let Battery = require("./battery");
let MathExpression = require("./mathexpression");

module.exports = class house {

    constructor(powerPlant, marketPrice, location, owner, batteryCapacity, currBatteryCapacity) {
        this.powerPlant = powerPlant;
        this.marketPrice = marketPrice;
        this.location = location;
        this.owner = owner;
        this.battery = new Battery(owner, batteryCapacity, currBatteryCapacity);
        this.windTurbine = new WindTurbine(owner);
        this.mathExpression = new MathExpression();
        this.maxHouseConsumption = 1.35;
        this.minHouseConsumption = 0;
        this.houseConsumption = 914 / 744;
        this.statusMessage = "FULLY OPERATIONAL";
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

    utilizepowerPlant() {
        if (this.windTurbine.getCurrentPower() < this.houseConsumption &&
            this.powerPlant.getCurrentProduction() >= 0) {
            this.powerPlant.setCurrentCapacity(this.windTurbine.getCurrentPower() - this.houseConsumption);
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
            this.battery.setCurrentCapacity(this.windTurbine.getExcessPower() / 2);
        }
    }

    getOwner() {
        return this.owner;
    }

    getHouseConsumption() {
        return this.houseConsumption;
    }

    getLocation() {
        return this.location.getName();
    }

    status() {
        console.log("House owner: " + this.owner + ", Location: " + this.location.getName() + 
            ", Wind speed: " + this.location.getWindSpeed().toPrecision(3) + " m/s," + " Temp: " + 
            this.location.getTemp().toPrecision(3) + " °C," + " Status: " + this.statusMessage +  "\n" + 
            "Power output: " + this.windTurbine.getCurrentPower().toPrecision(3) + " kWh" +
            ", (Excess power " + this.windTurbine.getExcessPower().toPrecision(3) + ")" +
            ", Battery capacity: " + this.battery.getCurrentCapacity().toPrecision(3) + "/" +
            this.battery.getMaxCapacity().toPrecision(3) + " Ah" +
            ", House consumption: " + this.houseConsumption.toPrecision(3) + " kWh\n");
    }

    electricityConsumption() {
        this.windTurbine.windTurbineStatus(this.location.getWindSpeed());
        
        this.setHouseConsumption(this.houseConsumption * 
            this.mathExpression.getTempIncrease(this.location.getTemp()) +
            this.mathExpression.normalDistribution(0, 0.05));

        this.storeExcessPower();
        // TODO, set to 70% Battery, 30% Market
        this.marketPrice.setTotalProduction(this.windTurbine.getExcessPower() / 2);
        this.marketPrice.setMaxProduction(this.windTurbine.getMaxPower());

        this.consumePowerPlantBattery();
        this.consumeLocalBattery();
        this.blackoutCondition();

        // this.status();
        
        this.windTurbine.setExcessPowerZero();
    }

}
