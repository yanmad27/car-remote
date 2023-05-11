async function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await callApi('/login', 'POST', JSON.stringify({ email, password }));
    if (true) {
        localStorage.setItem('token', 'tokenabcdecs');
        window.location.href = '/dashboard';
    }
}

