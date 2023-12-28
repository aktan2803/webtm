document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/users`)
        .then(response => response.json())
        .then(users => {
            const foundUser = users.find(user => user.username === username && user.password === password);

            if (foundUser) {
                const message = document.getElementById('loginMessage');
                message.textContent = 'Login successful!';
                window.location.replace('index.html');
            } else {
                const message = document.getElementById('loginMessage');
                message.textContent = 'Invalid username or password. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            const message = document.getElementById('loginMessage');
            message.textContent = 'Login failed. Please try again later.';
        });
});
