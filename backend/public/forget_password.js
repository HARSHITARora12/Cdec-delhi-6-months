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
        startOtpProcess();
    }
}

async function resetPassword() {
    const otp = document.getElementById('otp').value;
    console.log(otp);
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
let timerInterval;
const otpValidityDuration = 300; // 5 minutes in seconds

// Function to request OTP
function startOtpProcess() {
    document.getElementById("requestOtpForm").style.display = "none";
    document.getElementById("resetPasswordForm").style.display = "block";
    startTimer(otpValidityDuration);
    document.getElementById("message").textContent = "OTP sent to your registered email.";
}

// Function to start timer
function startTimer(duration) {
    let timeLeft = duration;
    const timerElement = document.getElementById("timer");

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `OTP expires in: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "OTP expired. Please request a new one.";
            document.getElementById("resetPasswordForm").style.display = "none";
            document.getElementById("requestOtpForm").style.display = "block";
        }
    }, 1000);
}

// Function to reset password
// function resetPassword() {
//     const newPassword = document.getElementById("newPassword").value;
//     const reEnterPassword = document.getElementById("reEnterPassword").value;

//     // Check if passwords match
//     if (newPassword !== reEnterPassword) {
//         document.getElementById("message").textContent = "Passwords do not match!";
//         return;
//     }

//     // Simulate OTP and password verification (You can replace this with actual server validation)
//     const otp = document.getElementById("otp").value;
//     if (otp !== "123456") { // Replace "123456" with the actual OTP logic
//         document.getElementById("message").textContent = "Invalid OTP!";
//         return;
//     }

//     // Success message
//     clearInterval(timerInterval);
//     document.getElementById("message").textContent = "Password reset successful!";
//     document.getElementById("resetPasswordForm").reset();
//     document.getElementById("resetPasswordForm").style.display = "none";
//     document.getElementById("requestOtpForm").style.display = "block";
// }
