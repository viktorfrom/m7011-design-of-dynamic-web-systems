function getUser() {
    return fetch('http://127.0.0.1:3000/api/user/users/image')
        .then(res => res.json())
}
