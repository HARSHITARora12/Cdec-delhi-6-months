// add_club.js
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    console.log("Hii"+"Hello");
    form.addEventListener("submit", async function(e) {
        console.log("Hii");
        e.preventDefault(); // Prevent form from submitting the default way
        console.log("Hii");
        // Collect form data
        const formData = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            eligibility: document.getElementById("eligibility").value
        };
        console.log(formData);
        try {
            const response = await fetch("/club/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Club successfully added!");
                form.reset(); // Reset form fields
            } else {
                alert("Error adding club. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("An error occurred. Please try again.");
        }
    });
});
