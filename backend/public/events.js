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
                <p>Date: ${new Date(event.event_date).toLocaleDateString()}</p>
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

// When "Participate" is clicked
// function participateInEvent(eventName, buttonId) {
//     const eventElement = document.getElementById(buttonId).parentElement;

//     // Logging user info from session and event name
//     if (window.userInfo) {
//         console.log('Name:', window.userInfo.name);
//         console.log('Email:', window.userInfo.email);
//         console.log('Phone:', window.userInfo.phone);
//     }

//     fetch('/participate', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: window.userInfo.name,  // Name from user info
//             email: window.userInfo.email,  // Email from user info
//             phone: window.userInfo.phone,  // Phone collected from prompt
//             eventName: eventName  // Event name retrieved from the button click
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.participant) {
//             console.log('Participation successful!', data.participant);
//             const button = document.getElementById(buttonId);
//             button.textContent = 'Already Participated';
//             button.disabled = true;
//             button.classList.add('participated');
//             alert(`You have successfully registered for ${eventName}`);
//         } else {
//             alert(`Error: ${data.error}`);
//             console.error('Error:', data.error);
//         }
//     })
//     .catch(error => {
//         console.error('Error submitting participation:', error);
//         alert('Error submitting participation. Please try again.');
//     });
// }
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
