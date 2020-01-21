function getMarketPrices() {
    return fetch('http://127.0.0.1:3000/api/marketprice/users/marketprices')
        .then(res => res.json())
}

function getLatestMarketValue() {
    return fetch('http://127.0.0.1:3000/api/marketprice/users/latestMarketPriceValue')
        .then(res => res.json())
}