document.getElementById("registrationForm").addEventListener("submit", function(event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Clear any previous messages
    const existingMessage = document.querySelector(".message");
    if (existingMessage) {
        existingMessage.remove();
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        event.preventDefault();  // Prevent form submission

        // Display an error message
        const message = document.createElement("p");
        message.className = "message";
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        document.getElementById("registrationForm").appendChild(message);
    }
});
// password_check.js

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const formData = {
        fullName: document.getElementById("fullName").value,
        studentId: document.getElementById("studentId").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        age: document.getElementById("age").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        course: document.getElementById("course").value,
        branch: document.getElementById("branch").value,
        year: document.getElementById("year").value,
        gender: document.getElementById("gender").value,
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Redirect to the student home  page
            window.location.href = "student_home_page.html";
        } else {
            alert(data);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
});
