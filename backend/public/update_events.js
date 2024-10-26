// Dummy data for events (you can replace it with your actual backend calls)
const events = [
    { id: 1, name: 'Seminar on AI', time: '10:00 AM', venue: 'Hall A' },
    { id: 2, name: 'Workshop on Web Development', time: '2:00 PM', venue: 'Lab 2' },
    { id: 3, name: 'Conference on Data Science', time: '11:00 AM', venue: 'Auditorium' }
];

// Edit event handler
function editEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    // Show form and populate with current event data
    document.getElementById('editFormContainer').classList.remove('hidden');
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventVenue').value = event.venue;

    // Add event listener for form submission
    const form = document.getElementById('editForm');
    form.onsubmit = function (e) {
        e.preventDefault(); // Prevent form from submitting in the traditional way

        // Get the new values
        const newName = document.getElementById('eventName').value;
        const newTime = document.getElementById('eventTime').value;
        const newVenue = document.getElementById('eventVenue').value;

        // Update the event in the events array
        event.name = newName;
        event.time = newTime;
        event.venue = newVenue;

        // Optionally, send the updated event data to your backend API here
        console.log(`Event ID: ${eventId} updated with Name: ${newName}, Time: ${newTime}, Venue: ${newVenue}`);

        // Hide the form after updating
        document.getElementById('editFormContainer').classList.add('hidden');

        // Optionally refresh the list or update the UI here to reflect the changes
    };
}

// Cancel edit handler
function cancelEdit() {
    document.getElementById('editFormContainer').classList.add('hidden');
}
