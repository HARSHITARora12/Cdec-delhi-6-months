// function deleteClub(clubId) {
//     if (confirm("Are you sure you want to delete this club?")) {
//         // Send request to server to delete club by ID
//         window.location.href = `delete_club.php?club_id=${clubId}`;
//     }
// }
// // Fetch clubs dynamically from the server
async function fetchClubs() {
    try {
        const response = await fetch('/club/clubs');
        const clubs = await response.json();

        const clubList = document.getElementById('clubList');
        clubList.innerHTML = ''; // Clear existing content

        clubs.forEach(club => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${club.name}</span>
                <span class="delete-btn" onclick="deleteClub(${club.id})">❌</span>
            `;
            clubList.appendChild(li);
        });
    } catch (err) {
        console.error('Error fetching clubs:', err);
    }
}

// Delete club by ID
// function deleteClub(clubId) {
//     if (confirm('Are you sure you want to delete this club?')) {
//         window.location.href = `delete_club.php?club_id=${clubId}`;
//     }
// }
async function deleteClub(clubId) {
    const confirmDelete = confirm('Are you sure you want to delete this club?');
    if (confirmDelete) {
        try {
            const response = await fetch(`/club/deleteclub/${clubId}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message); // Success message
                fetchClubs(); // Refresh the club list
            } else {
                alert(result.message); // Show error or not found message
            }
        } catch (error) {
            console.error('Error deleting club:', error);
            alert('An error occurred while deleting the club.');
        }
    }
}
// Fetch and display clubs on page load
window.onload = fetchClubs;
