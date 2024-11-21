

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('Login successful');
            // Redirect to another page if needed
            window.location.href = "student_home_page.html";
        } else {
            alert('Invalid credentials');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Server error. Please try again later.');
    }
});


// login.js

// Wait for the DOM to fully load
// document.addEventListener('DOMContentLoaded', function () {
//     // Get the link element by ID
//     const registerLink = document.getElementById('registerLink');

//     // Add a click event listener to the link
//     registerLink.addEventListener('click', function (event) {
//         // Prevent the default behavior of the anchor tag
//         event.preventDefault();

//         // Redirect to the index.html page
//         window.location.href = 'register.html';
//     });
// });
document.addEventListener("DOMContentLoaded", () => {
    const captchaDisplay = document.getElementById("captchaDisplay");
    const captchaInput = document.getElementById("captchaInput");
    const refreshCaptcha = document.getElementById("refreshCaptcha");
    const loginForm = document.getElementById("loginForm");

    // Function to generate random CAPTCHA
    function generateCaptcha() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    }

    // Function to refresh and display a new CAPTCHA
    function refreshCaptchaDisplay() {
        const captcha = generateCaptcha();
        captchaDisplay.textContent = captcha;
    }

    // Event listener to refresh CAPTCHA
    refreshCaptcha.addEventListener("click", refreshCaptchaDisplay);

    // Form submission with CAPTCHA validation
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission for validation
        if (captchaInput.value !== captchaDisplay.textContent) {
            alert("Incorrect CAPTCHA. Please try again.");
            refreshCaptchaDisplay();
        } else {
            alert("Login successful!");
            // Proceed with form submission logic
        }
    });

    // Initialize CAPTCHA on page load
    refreshCaptchaDisplay();
});

