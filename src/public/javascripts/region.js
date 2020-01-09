function getRegions() {
    return fetch('http://127.0.0.1:3000/api/region/users/regions')
        .then(res => res.json())
}

