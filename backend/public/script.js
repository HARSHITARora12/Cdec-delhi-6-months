

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

