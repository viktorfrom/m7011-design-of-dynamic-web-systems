"use strict";

module.exports = class battery {

    constructor(owner, currentCapacity, maxCapacity) {
        this.owner = owner;
        this.maxCapacity = maxCapacity;
        this.minCapacity = 0;
        this.currentCapacity = currentCapacity;
    }

    setCurrentCapacity(capacity) {
        let totalCapacity = this.currentCapacity + capacity;

        if (totalCapacity >= this.maxCapacity) {
            this.currentCapacity = this.maxCapacity;
        } else if (totalCapacity <= this.minCapacity) {
            this.currentCapacity = this.minCapacity;
        } else {
            this.currentCapacity += capacity;
        }
    }

    getOwner() {
        return this.owner
    }

    getMaxCapacity() {
        return this.maxCapacity;
    }

    getCurrentCapacity() {
        return this.currentCapacity;
    }
}
