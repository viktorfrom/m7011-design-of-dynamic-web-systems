const { expect } = require("chai");
let Region = require("../model/region.js");


describe("CurrentWindSpeed", async () => {
  it("current wind speed atleast 0 or greater", async () => {
      let testRegion = new Region("testRegion");
      expect(testRegion.getWindSpeed()).equal(5.2);
      expect(testRegion.getWindSpeed()).to.be.greaterThan(0);
      testRegion.setWindSpeed(15);
      expect(testRegion.getWindSpeed()).equal(15);
}); })

describe("currentTemp", async () => {
  it("current temp atleast 0 or less", async () => {
      let testRegion = new Region("testRegion");
      expect(testRegion.getTemp()).to.be.lessThan(1);
      testRegion.setTemp(-15)
}); })

describe("regionName", async () => {
  it("name of region", async () => {
      let testRegion = new Region("testRegion");
      expect(testRegion.getName()).equal("testRegion");
}); })