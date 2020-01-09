function getHouse() {
    fetch('http://127.0.0.1:3000/api/house/users/current')
        .then(res => res.json())
        .then(house => {

            document.getElementById('time').innerHTML = house.timestamp;

            // document.getElementById('owner').innerHTML = house.owner;
            // document.getElementById('region').innerHTML = house.region;
            document.getElementById('maxHouseConsumption').innerHTML = house.maxHouseConsumption;
            document.getElementById('houseConsumption').innerHTML = house.houseConsumption.toPrecision(4);

            document.getElementById('batteryMaxCapacity').innerHTML = house.battery.maxCapacity;
            document.getElementById('batteryCurrCapacity').innerHTML = house.battery.currentCapacity.toPrecision(4);

            document.getElementById('windTurbineMaxPower').innerHTML = house.windTurbine.maxPower;
            document.getElementById('windTurbineCurrPower').innerHTML = house.windTurbine.currentPower.toPrecision(4);
            document.getElementById('windTurbineExcessPower').innerHTML = house.windTurbine.excessPower.toPrecision(4);
            // document.getElementById('statusMessage').innerHTML = house.statusMessage;

            // document.getElementById('powerPlant').innerHTML = house.powerPlant;
            document.getElementById('statusMessage').innerHTML = house.statusMessage;

            // document.getElementById('marketPriceName').innerHTML = house.marketPrice.name;
            // document.getElementById('marketPriceElectricityPrice').innerHTML = house.marketPrice.electricityPrice;
            // document.getElementById('marketPriceCurrentPrice').innerHTML = house.marketPrice.marketPriceSchema.currentPrice;
        })
        .catch(err => console.log(err));
}

function getHouses() {
    return fetch('http://127.0.0.1:3000/api/house/users/houses')
        .then(res => res.json())
}
