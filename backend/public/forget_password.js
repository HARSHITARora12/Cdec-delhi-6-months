let userEmail; // Global variable to store email

async function requestOtp() {
    userEmail = document.getElementById('email').value; // Store email in global variable

    const response = await fetch('/forgot-password/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
    });
    
    const result = await response.json();
    document.getElementById('message').textContent = result.message;

    if (result.success) {
        document.getElementById('requestOtpForm').style.display = 'none';
        document.getElementById('resetPasswordForm').style.display = 'block';
    }
}

async function resetPassword() {
    const otp = document.getElementById('otp').value;
    const newPassword = document.getElementById('newPassword').value;

    const response = await fetch('/forgot-password/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, otp, newPassword }) // Pass email in the request body
    });

    const result = await response.json();
    document.getElementById('message').textContent = result.message;

    if (result.success) {
        alert('Password reset successfully');
        window.location.href = 'admin_home_screen.html'; 
    }
}
