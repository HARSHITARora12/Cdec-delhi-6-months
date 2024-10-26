document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('adminRegistrationForm');

    // Register Admin
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const adminId = document.getElementById('adminId').value.trim();
        const department = document.getElementById('department').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const gender = document.getElementById('gender').value;

        // Basic Frontend Validation
        if (!name || !adminId || !department || !phoneNumber || !email || !password || !confirmPassword || !gender) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate phone number format (basic example)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        // Validate password strength
        // Example: Minimum 8 characters, at least one letter and one number
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and include both letters and numbers.');
            return;
        }

        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    adminId,
                    department,
                    phoneNumber,
                    email,
                    password,
                    gender
                })
            });

            const data = await response.json();
            console.log("Registration Response:", data);

            if (data.status==='success') {
                alert('Registration successful!');
                window.location.href = "admin_home_screen.html"; // Redirect to the admin dashboard after registration
            } else {
                console.log("arora");
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration. Please try again later.');
        }
    });
});

