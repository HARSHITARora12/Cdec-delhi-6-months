// const clubList = document.getElementById('clubList');
const editModal = document.getElementById('editModal');
const clubNameInput = document.getElementById('clubName');
const clubDescriptionInput = document.getElementById('clubDescription');
const clubEligibilityInput = document.getElementById('clubEligibility');
const updateBtn = document.getElementById('updateBtn');
const cancelBtn = document.getElementById('cancelBtn');
let currentClubId = null;

// Fetch clubs from the backend
fetch('/club/clubs')
    .then(response => response.json())
    .then(data => {
        data.forEach(club => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${club.name}</span>
                <span class="edit-btn" onclick="editClub(${club.id}, '${club.name}', '${club.description}', '${club.eligibility}')">✏️</span>
            `;
            clubList.appendChild(li);
        });
    })
    .catch(err => console.error('Error fetching clubs:', err));

// Function to open the modal with the club details
function editClub(id, name, description, eligibility) {
    currentClubId = id;
    clubNameInput.value = name;
    clubDescriptionInput.value = description;
    clubEligibilityInput.value = eligibility;
    editModal.style.display = 'block';
}

// Update club details on the backend
updateBtn.addEventListener('click', () => {
    const newName = clubNameInput.value;
    const newDescription = clubDescriptionInput.value;
    const newEligibility = clubEligibilityInput.value;
    //console.log("HARSHITA");
    if (newName && newDescription && newEligibility && currentClubId !== null) {
        fetch('/club/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: currentClubId,
                name: newName,
                description: newDescription,
                eligibility: newEligibility
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                location.reload();  // Reload the page to reflect the changes
            }
        })
        .catch(err => console.error('Error updating club:', err));
    }
});
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// Close the modal if the user clicks cancel
cancelBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
});
