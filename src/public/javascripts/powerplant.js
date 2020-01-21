function getPowerPlants() {
    return fetch('http://127.0.0.1:3000/api/powerplant/users/powerplants')
        .then(res => res.json())
}

function getLatestProductionValue() {
    return fetch('http://127.0.0.1:3000/api/powerplant/users/latestProductionValue')
        .then(res => res.json())
}