document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/get-user-info');
        const data = await response.json();

        if (data.name) {
            document.getElementById('header').textContent = `Welcome, ${data.name}`;
        } else {
            window.location.href = 'login.html'; // Redirect to login if not authenticated
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        window.location.href = 'login.html'; // Redirect to login if there's an error
    }
});

const eventsButton = document.getElementById('eventsButton');
const dropdownMenu = document.getElementById('dropdownMenu');

eventsButton.addEventListener('click', function(event) {
    event.preventDefault();
    dropdownMenu.classList.toggle('show-dropdown');
});

document.addEventListener('click', function(event) {
    if (!eventsButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show-dropdown');
    }
});
