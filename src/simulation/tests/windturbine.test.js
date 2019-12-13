const { expect } = require("chai");
let MarketPrice = require("../model/marketprice.js");
let PowerPlant = require("../model/powerplant.js");
let Region = require("../model/region.js");
let House = require("../model/house.js")

describe("windturbineOwner", async () => {
  it("name of windturbine owner", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", this.marketPrice, "testRegion", 0, 30);
    let testRegion = new Region("testRegion");
    let testHouse = new House(testPowerPlant, testMarketPrice, testRegion, "testPerson", 0, 10);

    expect(testHouse.windTurbine.getOwner()).equal("testPerson");
}); })

describe("windturbinePower", async () => {
  it("windturbine power production", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", this.marketPrice, "testRegion", 0, 30);
    let testRegion = new Region("testRegion");
    let testHouse = new House(testPowerPlant, testMarketPrice, testRegion, "testPerson", 0, 10);

    expect(testHouse.windTurbine.getMaxPower()).equal(1.5);
    expect(testHouse.windTurbine.getCurrentPower()).equal(0);
    expect(testHouse.windTurbine.getExcessPower()).equal(0);
    testHouse.windTurbine.setCurrentPower(1);
    expect(testHouse.windTurbine.getCurrentPower()).equal(1);
    testHouse.windTurbine.setExcessPower(1);
    expect(testHouse.windTurbine.getExcessPower()).equal(0);
}); })

describe("windturbineBrokenStatus", async () => {
  it("get status of broken windturbine", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", this.marketPrice, "testRegion", 0, 30);
    let testRegion = new Region("testRegion");
    let testHouse = new House(testPowerPlant, testMarketPrice, testRegion, "testPerson", 0, 10);

    expect(testHouse.windTurbine.getBrokenStatus()).equal(false);
    testHouse.windTurbine.setBrokenStatus(true);
    expect(testHouse.windTurbine.getBrokenStatus()).equal(true);
}); })