function getHouses() {
    return fetch('http://127.0.0.1:3000/api/house/users/houses')
        .then(res => res.json())
}
