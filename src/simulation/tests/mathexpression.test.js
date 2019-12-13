const { expect } = require("chai");
let MathExpression = require("../model/mathexpression.js");

describe("mathExpressionNormDist", async () => {
  it("interval of norm dist func", async () => {
    
    let testMathExpression = new MathExpression();

    expect(testMathExpression.normalDistribution(0, 0.1)).to.be.below(1);
    expect(testMathExpression.normalDistribution(0, 0.1)).to.be.above(-1);
}); })

describe("mathExpressionTempIncrease", async () => {
  it("name of battery owner", async () => {
    
    let testMathExpression = new MathExpression();

    expect(testMathExpression.getTempIncrease(50)).to.be.greaterThan(1);
    expect(testMathExpression.getTempIncrease(50)).to.be.lessThan(2);
}); })