// // Dummy data for events (you can replace it with your actual backend calls)
// // const events = [
// //     { id: 1, name: 'Seminar on AI', time: '10:00 AM', venue: 'Hall A' },
// //     { id: 2, name: 'Workshop on Web Development', time: '2:00 PM', venue: 'Lab 2' },
// //     { id: 3, name: 'Conference on Data Science', time: '11:00 AM', venue: 'Auditorium' }
// // ];

// // Edit event handler
// // function editEvent(eventId) {
// //     const event = events.find(e => e.id === eventId);
// //     if (!event) return;

// //     // Show form and populate with current event data
// //     document.getElementById('editFormContainer').classList.remove('hidden');
// //     document.getElementById('eventName').value = event.name;
// //     document.getElementById('eventTime').value = event.time;
// //     document.getElementById('eventVenue').value = event.venue;

// //     // Add event listener for form submission
// //     const form = document.getElementById('editForm');
// //     form.onsubmit = function (e) {
// //         e.preventDefault(); // Prevent form from submitting in the traditional way

// //         // Get the new values
// //         const newName = document.getElementById('eventName').value;
// //         const newTime = document.getElementById('eventTime').value;
// //         const newVenue = document.getElementById('eventVenue').value;

// //         // Update the event in the events array
// //         event.name = newName;
// //         event.time = newTime;
// //         event.venue = newVenue;

// //         // Optionally, send the updated event data to your backend API here
// //         console.log(`Event ID: ${eventId} updated with Name: ${newName}, Time: ${newTime}, Venue: ${newVenue}`);

// //         // Hide the form after updating
// //         document.getElementById('editFormContainer').classList.add('hidden');

// //         // Optionally refresh the list or update the UI here to reflect the changes
// //     };
// // }

// // // Cancel edit handler
// // function cancelEdit() {
// //     document.getElementById('editFormContainer').classList.add('hidden');
// // }
// document.addEventListener('DOMContentLoaded', () => {
//     loadEvents(); // Load events when the page loads
// });

// // Function to load events from the API
// async function loadEvents() {
//     try {
//         const response = await fetch('/api/events');
//         const events = await response.json();

//         // Select the event list container
//         const eventList = document.getElementById('eventList');
//         eventList.innerHTML = ''; // Clear existing list items

//         // Populate the event list with data from the API
//         events.forEach(event => {
//             const listItem = document.createElement('li');
//             listItem.innerHTML = `
//                 <span>${event.event_name}</span>
//                 <span class="edit-btn" onclick="editEvent(${event.id})">✏️</span>
//             `;
//             eventList.appendChild(listItem);
//         });
//     } catch (error) {
//         console.error('Error loading events:', error);
//     }
// }

// // Function to open the edit form with event details
// async function editEvent(eventId) {
//     try {
//         const response = await fetch(`/api/events/${eventId}`);
//         const event = await response.json();
//         console.log(event);
//         console.log('harshita')
//         // Populate form fields with event data
//         document.getElementById('eventName').value = event.event_name;
//         document.getElementById('eventTime').value = event.time;
//         document.getElementById('eventVenue').value = event.venue;
//         document.getElementById('startDate').value = event.start_date.slice(0, 10);
//         document.getElementById('endDate').value = event.end_date.slice(0, 10);

//         // Show the dialog
//         document.getElementById('dialogOverlay').style.display = 'block';

//         // Add event listener to save button
//         document.getElementById('editForm').onsubmit = async (e) => {
//             e.preventDefault();
//             await updateEvent(eventId);
//         };
//     } catch (error) {
//         console.error('Error loading event for editing:', error);
//     }
// }

// // Function to update event details and close the dialog
// async function updateEvent(eventId) {
//     const updatedEvent = {
//         event_name: document.getElementById('eventName').value,
//         time: document.getElementById('eventTime').value,
//         venue: document.getElementById('eventVenue').value,
//         start_date: document.getElementById('startDate').value,
//         end_date: document.getElementById('endDate').value
//     };

//     try {
//         const response = await fetch(`/api/events/${eventId}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updatedEvent)
//         });

//         const result = await response.json();
//         alert(result.message || 'Event updated successfully');

//         // Hide the dialog box and reload the events
//         document.getElementById('dialogOverlay').style.display = 'none';
//         loadEvents();
//     } catch (error) {
//         console.error('Error updating event:', error);
//     }
// }

// // Function to close the dialog without saving
// function cancelEdit() {
//     document.getElementById('dialogOverlay').style.display = 'none';
// }
document.addEventListener('DOMContentLoaded', () => {
    loadEvents(); // Load events when the page loads
});

// Function to load events from the API
async function loadEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();

        // Select the event list container
        const eventList = document.getElementById('eventList');
        eventList.innerHTML = ''; // Clear existing list items

        // Populate the event list with data from the API
        events.forEach(event => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${event.event_name}</span>
                <span class="edit-btn" onclick="editEvent(${event.id})">✏️</span>
            `;
            eventList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Function to open the edit form with event details
async function editEvent(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}`);
        const event = await response.json();

        // Populate form fields with event data
        document.getElementById('eventName').value = event.event_name;
        document.getElementById('eventTime').value = event.time;
        document.getElementById('eventVenue').value = event.venue;
        document.getElementById('startDate').value = event.start_date.slice(0, 10);
        document.getElementById('endDate').value = event.end_date.slice(0, 10);

        // Show the modal dialog
        document.getElementById('dialogOverlay').style.display = 'block';

        // Add event listener to save button
        document.getElementById('editForm').onsubmit = async (e) => {
            e.preventDefault();
            await updateEvent(eventId);
        };
    } catch (error) {
        console.error('Error loading event for editing:', error);
    }
}

// Function to update event details and close the dialog
async function updateEvent(eventId) {
    const updatedEvent = {
        event_name: document.getElementById('eventName').value,
        time: document.getElementById('eventTime').value,
        venue: document.getElementById('eventVenue').value,
        start_date: document.getElementById('startDate').value,
        end_date: document.getElementById('endDate').value
    };

    try {
        const response = await fetch(`/api/events/${eventId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEvent)
        });

        const result = await response.json();
        alert(result.message || 'Event updated successfully');

        // Hide the dialog box and reload the events
        document.getElementById('dialogOverlay').style.display = 'none';
        loadEvents();
    } catch (error) {
        console.error('Error updating event:', error);
    }
}

// Function to close the dialog without saving
function cancelEdit() {
    document.getElementById('dialogOverlay').style.display = 'none';
}
