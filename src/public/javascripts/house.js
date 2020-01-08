function getHouse() {
    fetch('http://127.0.0.1:3000/api/house/users/current')
        .then(res => res.json())
        .then(house => {
            document.getElementById('owner').innerHTML = house.owner;
            document.getElementById('region').innerHTML = house.region;
            document.getElementById('maxHouseConsumption').innerHTML = house.maxHouseConsumption;
            document.getElementById('houseConsumption').innerHTML = house.houseConsumption;

            document.getElementById('batteryMaxCapacity').innerHTML = house.battery.maxCapacity;
            document.getElementById('batteryCurrCapacity').innerHTML = house.battery.currentCapacity;

            document.getElementById('windTurbineMaxPower').innerHTML = house.windTurbine.maxPower;
            document.getElementById('windTurbineCurrPower').innerHTML = house.windTurbine.currentPower;
            document.getElementById('windTurbineExcessPower').innerHTML = house.windTurbine.excessPower;
            document.getElementById('statusMessage').innerHTML = house.statusMessage;

            document.getElementById('powerPlant').innerHTML = house.powerPlant;

            document.getElementById('marketPriceName').innerHTML = house.marketPrice.name;
            document.getElementById('marketPriceElectricityPrice').innerHTML = house.marketPrice.electricityPrice;
            document.getElementById('marketPriceCurrentPrice').innerHTML = house.marketPrice.marketPriceSchema.currentPrice;
        })
        .catch(err => console.log(err));
}
