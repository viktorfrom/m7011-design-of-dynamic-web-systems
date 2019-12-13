"use strict";

let Init = require("./init.js");

// const runSimulation = async function () {
//     let init = new Init();

//     await init.timespan();
// }

// const runSimulation = function () {
//     let init = new Init();

//     init.timespan();
// }

// runSimulation();

module.exports = class simulation {

    constructor() {
    }

    runSimulation() {
        this.init = new Init();
        this.init.timespan();
    }
}