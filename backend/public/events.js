document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Fetch the events from the API
        const response = await fetch('/api/events');
        const events = await response.json();

        // Fetch the user info and their participation data
        const userResponse = await fetch('/get-user-info'); // Assuming this returns user info with participation data
        const userData = await userResponse.json();
        window.userInfo = userData; 
        
        // Store user info globally
    
        const participatedEvents = userData.participatedEvents || []; // List of participated events

        // Check if events were returned
        if (!Array.isArray(events) || events.length === 0) {
            document.querySelector('.container').innerHTML = '<p>No events available.</p>';
            return;
        }

        // Dynamically create event elements
        const container = document.querySelector('.container');
        container.innerHTML = '<h1>Upcoming Events</h1>';  // Set the heading
        console.log(events);
        events.forEach((event, index) => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.id = `event${index + 1}`;
            
            // Check if the user has already participated in this event
            const hasParticipated = participatedEvents.includes(event.event_name);

            const buttonText = hasParticipated ? 'Already Participated' : 'Participate';
            const buttonClass = hasParticipated ? 'participated-btn' : 'participate-btn';
            const isDisabled = hasParticipated ? 'disabled' : '';

            eventDiv.innerHTML = `
                <h2>${event.event_name}</h2>
                <p>Start Date: ${new Date(event.start_date).toLocaleDateString()}</p>
                <p>End Date: ${new Date(event.end_date).toLocaleDateString()}</p>
                <p>Venue: ${event.venue}</p>
                <button class="${buttonClass}" id="btn${index + 1}" onclick="participateInEvent('${event.event_name}', 'btn${index + 1}')" ${isDisabled}>${buttonText}</button>
            `;
            container.appendChild(eventDiv);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        document.querySelector('.container').innerHTML = '<p>Error loading events. Please try again later.</p>';
    }
});

// Assuming `events` is the array containing event objects and `participatedEvents` is an array with names of events the user has already participated in.
// events.forEach((event, index) => {
//     const eventDiv = document.createElement('div');
//     eventDiv.classList.add('event');
//     eventDiv.id = `event${index + 1}`;
    
//     // Check if the user has already participated in this event
//     const hasParticipated = participatedEvents.includes(event.event_name);

//     const buttonText = hasParticipated ? 'Already Participated' : 'Participate';
//     const buttonClass = hasParticipated ? 'participated-btn' : 'participate-btn';
//     const isDisabled = hasParticipated ? 'disabled' : '';

//     // Format the date and time for display
//     const startDate = new Date(event.start_date).toLocaleDateString();
//     const endDate = new Date(event.end_date).toLocaleDateString();
//     const eventTime = event.time;

//     // HTML structure for each event
//     eventDiv.innerHTML = `
//         <h2>${event.event_name}</h2>
//         <p>Day: ${event.day}</p>
//         <p>Start Date: ${startDate}</p>
//         <p>End Date: ${endDate}</p>
//         <p>Time: ${eventTime}</p>
//         <p>Venue: ${event.venue}</p>
//         <p>Open Participation: ${event.open_participation}</p>
//         <button class="${buttonClass}" id="btn${index + 1}" onclick="participateInEvent('${event.event_name}', 'btn${index + 1}')" ${isDisabled}>${buttonText}</button>
//     `;
//     container.appendChild(eventDiv);
// });

function participateInEvent(eventName, buttonId) {
    const eventElement = document.getElementById(buttonId).parentElement;
    const eventDate = eventElement.querySelector('p').textContent.split(': ')[1]; // Extracting date
    document.getElementById('dialogEventName').textContent = `Event: ${eventName}`;
    document.getElementById('dialogEventDate').textContent = `Date: ${eventDate}`;
    
    // Show the dialog
    document.getElementById('categoryDialog').style.display = 'block';

    // Add event listener to "Participate" button in the dialog
    document.getElementById('confirmParticipation').onclick = function() {
        const selectedCategory = document.getElementById('categorySelect').value;

        console.log("harshi5"+selectedCategory);
        console.log(window.userInfo);
        fetch('/participate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: window.userInfo.name,
                email: window.userInfo.email,
                phone: window.userInfo.phone,
                eventName: eventName,
                category: selectedCategory  // Include selected category in the request
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.participant) {
                console.log('Participation successful!', data.participant);
                const button = document.getElementById(buttonId);
                button.textContent = 'Already Participated';
                button.disabled = true;
                button.classList.add('participated');
                alert(`You have successfully registered for ${eventName} in the ${selectedCategory} category`);
            } else {
                alert(`Error: ${data.error}`);
                console.error('Error:', data.error);
            }
            document.getElementById('categoryDialog').style.display = 'none';  // Close dialog
        })
        .catch(error => {
            console.error('Error submitting participation:', error);
            alert('Error submitting participation. Please try again.');
            document.getElementById('categoryDialog').style.display = 'none';  // Close dialog
        });
    };

    // Add event listener to "Cancel" button to close the dialog
    document.getElementById('closeDialog').onclick = function() {
        document.getElementById('categoryDialog').style.display = 'none';
    };
}
function handleParticipate(event) {
    const eventId = event.target.dataset.id;

    if (participatedEvents.has(eventId)) {
        alert("You have already participated in this event!");
        return;
    }

    const eventDetails = events.find((e) => e.id == eventId);
    document.getElementById("dialogEventName").textContent = eventDetails.name;
    document.getElementById("dialogEventDate").textContent = `Date: ${eventDetails.date}`;

    // Show dialog
    document.getElementById("categoryDialog").style.display = "block";
    document.getElementById("dialogOverlay").style.display = "block";

    document.getElementById("confirmParticipation").dataset.id = eventId;
}

function confirmParticipation(event) {
    const eventId = event.target.dataset.id;
    participatedEvents.add(eventId);

    // Update button state
    const button = document.querySelector(`button[data-id='${eventId}']`);
    button.textContent = "Already Participated";
    button.classList.add("participated");
    button.disabled = true;

    closeDialog();
}

function closeDialog() {
    document.getElementById("categoryDialog").style.display = "none";
    document.getElementById("dialogOverlay").style.display = "none";
}
