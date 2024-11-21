// Fetch events from API
async function fetchEvents() {
    try {
        const response = await fetch('/api/events'); // Replace with your API endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const events = await response.json();
        const eventList = document.getElementById('eventList');

        // Clear the current list before adding new items
        eventList.innerHTML = ''; 

        events.forEach(event => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${event.event_name}</span>
                <span class="delete-btn" onclick="deleteEvent(${event.id})">❌</span>
            `;
            eventList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Function to delete event
async function deleteEvent(eventId) {
    if (confirm("Are you sure you want to delete this event?")) {
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');

            // Re-fetch events to update the list
            fetchEvents(); 
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }
}

// Call fetchEvents on page load
window.onload = fetchEvents;
