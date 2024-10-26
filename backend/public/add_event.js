// script.js
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function(e) {
        e.preventDefault(); // Prevent form from submitting the default way
        
        // Collect form data
        const formData = {
            eventName: document.getElementById("eventName").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
            venue: document.getElementById("venue").value,
            time: document.getElementById("time").value,
            day: document.getElementById("day").value,
            openParticipation: document.querySelector('input[name="openParticipation"]:checked').value
        };

        try {
            const response = await fetch("/api/createEvents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Event successfully created!");
                form.reset(); // Reset form fields
            } else {
                alert("Error creating event. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("An error occurred. Please try again.");
        }
    });
});
// Listen for changes to the 'startDate' input
document.getElementById('startDate').addEventListener('change', function() {
    const dateInput = new Date(this.value); // Get the selected date
    const dayOfWeek = dateInput.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
    
    const daySelect = document.getElementById('day'); // Get the 'day' dropdown

    // Array mapping for day of the week (0 = Sunday, 1 = Monday, etc.)
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (!isNaN(dayOfWeek)) {
        // Set the dropdown value to the corresponding day
        daySelect.value = daysOfWeek[dayOfWeek];
    }
});