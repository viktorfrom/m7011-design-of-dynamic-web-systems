"use strict";

let Init = require("./init.js");

module.exports = {

    runSimulation: function() {
        this.init = new Init();
        this.init.retrieveUsers();
    }
}