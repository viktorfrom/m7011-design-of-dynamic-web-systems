const { expect } = require("chai");
let MarketPrice = require("../model/marketprice.js");
let PowerPlant = require("../model/powerplant.js");
let Region = require("../model/region.js");
let House = require("../model/house.js")

describe("houseOwner", async () => {
  it("name of house owner", async () => {

    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", this.marketPrice, "testRegion", 0, 30);
    let testRegion = new Region("testRegion");
    let testHouse = new House(testPowerPlant, testMarketPrice, testRegion, "testPerson", 0, 10);

    expect(testHouse.getOwner()).equal("testPerson");
}); })

describe("houseConsumption", async () => {
  it("consumption of household", async () => {

    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", this.marketPrice, "testRegion", 0, 30);
    let testRegion = new Region("testRegion");
    let testHouse = new House(testPowerPlant, testMarketPrice, testRegion, "testPerson", 0, 10);

    expect(testHouse.getHouseConsumption()).to.be.greaterThan(0);
    expect(testHouse.getHouseConsumption()).equal(914/744);
    testHouse.setHouseConsumption(1.35);
    expect(testHouse.getHouseConsumption()).to.be.lessThan(1.36);
}); })

describe("houseLocation", async () => {
  it("location of household", async () => {

    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", this.marketPrice, "testRegion", 0, 30);
    let testRegion = new Region("testRegion");
    let testHouse = new House(testPowerPlant, testMarketPrice, testRegion, "testPerson", 0, 10);

    expect(testHouse.getLocation()).equal("testRegion");
}); })