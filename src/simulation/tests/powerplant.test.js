const { expect } = require("chai");
let MarketPrice = require("../model/marketprice.js");
let PowerPlant = require("../model/powerplant.js");

describe("powerPlantName", async () => {
  it("name of power plant", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", testMarketPrice, "testRegion", 0, 30);

    expect(testPowerPlant.getName()).equal("testPowerPlant");
}); })


describe("powerPlantProduction", async () => {
  it("current production of power plant", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", testMarketPrice, "testRegion", 0, 30);

    expect(testPowerPlant.getCurrentProduction()).to.be.at.least(0);
    expect(testPowerPlant.getCurrentProduction()).to.be.below(30);
    testPowerPlant.setCurrentProduction(15)
    expect(testPowerPlant.getCurrentProduction()).to.be.at.least(0);
    expect(testPowerPlant.getCurrentProduction()).to.be.below(30);
}); })

describe("powerPlantStartUpSeq", async () => {
  it("current production after start up seq", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");
    let testPowerPlant = new PowerPlant("testPowerPlant", testMarketPrice, "testRegion", 0, 30);

    for (let i = 0; i < 10; i++) { 
        testPowerPlant.initStartUp();
    }
    expect(testPowerPlant.getCurrentProduction()).to.be.at.least(0);
    expect(testPowerPlant.getCurrentProduction()).to.be.below(30);
}); })