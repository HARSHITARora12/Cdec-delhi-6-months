document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Make a POST request to the login API
        const response = await fetch('/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Send email and password in the request body
        });

        // Parse the JSON response
        const data = await response.json();

        if (response.ok) {
            // Login successful, redirect to the dashboard or some other page
            alert('Login successful!');
            window.location.href = 'admin_home_screen.html'; // Change to the desired page
        } else {
            // Handle errors (e.g., invalid credentials)
            alert(data.message || 'Login failed, please try again.');
        }
    } catch (error) {
        // Handle any network or other errors
        console.error('Error during login:', error);
        alert('An error occurred while trying to log in. Please try again later.');
    }
});
