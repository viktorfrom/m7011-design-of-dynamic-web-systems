const { expect } = require("chai");
let MarketPrice = require("../model/marketprice.js");
let PowerPlant = require("../model/powerplant.js");
let Region = require("../model/region.js");
let House = require("../model/house.js")

describe("batteryOwner", async () => {
  it("name of battery owner", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", this.marketPrice, "testRegion", 0, 30);
    let testRegion = new Region("testRegion");
    let testHouse = new House(testPowerPlant, testMarketPrice, testRegion, "testPerson", 0, 10);

    expect(testHouse.battery.getOwner()).equal("testPerson");
}); })

describe("batteryCapacity", async () => {
  it("get capacity of battery", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", this.marketPrice, "testRegion", 0, 30);
    let testRegion = new Region("testRegion");
    let testHouse = new House(testPowerPlant, testMarketPrice, testRegion, "testPerson", 0, 10);

    expect(testHouse.battery.getMaxCapacity()).equal(10);
    expect(testHouse.battery.getCurrentCapacity()).equal(0);
}); })