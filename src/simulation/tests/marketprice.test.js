const { expect } = require("chai");
let MarketPrice = require("../model/marketprice.js");

describe("marketPriceName", async () => {
  it("name of market price region", async () => {
    
    let testMarketPrice = new MarketPrice("testMarketPrice");

    expect(testMarketPrice.getName()).equal("testMarketPrice");
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