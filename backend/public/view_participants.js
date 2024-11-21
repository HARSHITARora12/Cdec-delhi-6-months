// Fetch participants data from the API and display it
async function fetchParticipants() {
    try {
        const response = await fetch('/participants'); // Ensure this matches your API route
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const participants = await response.json();
        console.log(participants);
        const participantsList = document.getElementById('participantsList');
        participantsList.innerHTML = '';

        participants.participants.forEach(participant => {
            const listItem = document.createElement('li');
            listItem.textContent = `${participant.name} - ${participant.event_name} (${participant.event_category})`;
            participantsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching participants:', error);
    }
}

// Call the function to fetch and display participants
fetchParticipants();

