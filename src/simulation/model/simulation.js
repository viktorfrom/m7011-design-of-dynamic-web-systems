"use strict";

let Init = require("./init.js");

module.exports = class simulation {

    constructor() {
    }

    runSimulation() {
        this.init = new Init();
        this.init.retrieveUsers();

        // this.init.timespan();
    }
}