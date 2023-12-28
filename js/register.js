document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        username: username,
        email: email,
        password: password
    };

    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Registration failed');
    })
    .then(data => {
        const message = document.getElementById('registerMessage');
        message.textContent = 'Registration successful!';
        console.log('User registered:', data);
        
        window.location.replace('index.html');
    })
    .catch(error => {
        const message = document.getElementById('registerMessage');
        message.textContent = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
    });
});
