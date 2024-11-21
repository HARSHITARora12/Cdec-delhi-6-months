// Fetch and render participants from the backend
function fetchParticipants() {
    fetch('/participants')
        .then(response => response.json())
        .then(data => {
            const participantList = document.getElementById('participantList');
            participantList.innerHTML = ''; // Clear the list before adding new participants
            console.log(data);
            data.participants.forEach(participant => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${participant.name} - ${participant.event_name} - ${participant.event_category}</span>
                    <div class="actions">
                        <button class="edit-btn" onclick="editParticipant(${participant.id})">✏️</button>
                        <button class="remove-btn" onclick="removeParticipant(${participant.id})">❌</button>
                    </div>
                `;
                participantList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching participants:', error);
        });
}

// Remove a participant by ID
function removeParticipant(id) {
    if (confirm("Are you sure you want to remove this participant?")) {
        fetch(`/remove-participants/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert("Participant removed successfully.");
                    fetchParticipants(); // Reload the list to reflect changes
                } else {
                    alert("Error removing participant.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred.");
            });
    }
}

// Edit participant details
function editParticipant(id) {
    // Fetch the participant details from the backend by ID
    fetch(`/participants/${id}`)
        .then(response => response.json())
        .then(participant => {
            const newName = prompt("Enter new name:", participant.name);
            const newCategory = prompt("Enter new event category:", participant.event_category);

            if (newName || newCategory) {
                // Prepare the updated data
                const updatedData = {
                    name: newName || participant.name, // Keep old value if no input
                    event_category: newCategory || participant.event_category
                };

                // Send update request to the backend
                fetch(`/participants/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData)
                })
                    .then(response => {
                        if (response.ok) {
                            alert("Participant details updated successfully.");
                            fetchParticipants(); // Reload the list to reflect changes
                        } else {
                            alert("Error updating participant details.");
                        }
                    })
                    .catch(error => {
                        console.error("Error updating participant:", error);
                        alert("An error occurred while updating.");
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching participant details:', error);
            alert("An error occurred while fetching participant details.");
        });
}
let currentEditingId = null; // To keep track of the participant being edited

function editParticipant(id) {
    fetch(`/participants/${id}`)
        .then(response => response.json())
        .then(participant => {
            // Populate the modal with participant details
         
           
            document.getElementById('editName').value = participant.participant.name;
            document.getElementById('editCategory').value = participant.participant.event_category;
            
            // Save the ID of the participant being edited
            currentEditingId = id;

            // Show the modal
            document.getElementById('editModal').style.display = 'flex';
        })
        .catch(error => {
            console.error('Error fetching participant details:', error);
            alert("An error occurred while fetching participant details.");
        });
}

function saveParticipantChanges() {
    const name = document.getElementById('editName').value;
    const category = document.getElementById('editCategory').value;

    // Send updated details to the backend
    fetch(`/participants/${currentEditingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, event_category: category })
    })
        .then(response => {
            if (response.ok) {
                alert("Participant details updated successfully.");
                closeEditModal(); // Close the modal
                fetchParticipants(); // Refresh the participant list
            } else {
                alert("Error updating participant details.");
            }
        })
        .catch(error => {
            console.error("Error updating participant:", error);
            alert("An error occurred while updating.");
        });
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditingId = null; // Reset the editing ID
}

// Load participants on page load
window.onload = fetchParticipants;
