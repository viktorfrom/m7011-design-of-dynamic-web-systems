const { expect } = require("chai");
let MarketPrice = require("../model/marketprice.js");

describe("marketPriceName", async () => {
  it("name of market price region", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");

    expect(testMarketPrice.getName()).equal("testMarketPrice");
}); })

describe("marketPriceCurrentTotalProduction", async () => {
  it("total production in all regions covered by market price", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");

    expect(testMarketPrice.getCurrentTotalProduction()).equal(0);
    expect(testMarketPrice.getCurrentTotalProduction()).to.be.below(100);
}); })

describe("marketPriceElectricityPrice", async () => {
  it("base price of market price", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");

    expect(testMarketPrice.getElectricityPrice()).equal(0.4825);
}); })

describe("marketPriceCurrentPrice", async () => {
  it("get curret price of the market", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");

    expect(testMarketPrice.getCurrentPrice()).equal(0);
}); })