const BE_URL = 'http://localhost:3000';
async function callApi(url, method = 'GET', body = null) {

    const response = await fetch(BE_URL + url, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token'),
        }
    }).then(res => res.json()).catch(err => console.log(err))

    return response
}
