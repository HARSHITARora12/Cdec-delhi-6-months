document.getElementById('manageEventsBtn').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up
    const dropdown = document.getElementById('manageEventsDropdown');
    dropdown.classList.toggle('active');
    closeOtherDropdowns('manageEventsDropdown');
});

document.getElementById('viewParticipantsBtn').addEventListener('click', function(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('viewParticipantsDropdown');
    dropdown.classList.toggle('active');
    closeOtherDropdowns('viewParticipantsDropdown');
});

document.getElementById('manageClubsBtn').addEventListener('click', function(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('manageClubsDropdown');
    dropdown.classList.toggle('active');
    closeOtherDropdowns('manageClubsDropdown');
});

// Function to close other dropdowns
function closeOtherDropdowns(activeDropdownId) {
    const dropdowns = ['manageEventsDropdown', 'viewParticipantsDropdown', 'manageClubsDropdown'];
    dropdowns.forEach(id => {
        if (id !== activeDropdownId) {
            document.getElementById(id).classList.remove('active');
        }
    });
}

// Close dropdowns if clicking outside
document.addEventListener('click', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
});
// admin.js



