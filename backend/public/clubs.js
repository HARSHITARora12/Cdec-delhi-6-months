// // // Function to check if a request is already sent
// // async function checkRequestStatus( clubName, buttonElement) {
// //     try {
// //         const userResponse = await fetch('/get-user-info');
// //         const user = await userResponse.json();
// //         const response = await fetch(`/club/check-join-request?userEmail=${user.email}&clubName=${encodeURIComponent(clubName)}`);
// //         const data = await response.json();
       
// //         if (data.requested) {
// //             buttonElement.textContent = 'Request Sent';
// //             buttonElement.disabled = true; // Optionally disabitle the button
// //         }
// //     } catch (error) {
// //         console.error('Error checking request status:', error);
// //     }
// // }

// // // Call the check function for each club
// // document.querySelectorAll('.request-btn').forEach(button => {
   
// //     const clubName = button.getAttribute('data-club-name'); // Assume buttons have data attributes for club names
// //     // fconst userEmail = 'user@example.com'; // Replace with the actual logged-in user's email

// //     checkRequestStatus(clubName, button);
// // });

// // // Fetch clubs from the server and render them
// // async function fetchAndRenderClubs() {
// //     try {
// //         // Fetch the list of all clubs
// //         const response = await fetch('/club/clubs');
// //         const clubs = await response.json();

// //         // Fetch user information once
// //         const userResponse = await fetch('/get-user-info');
// //         const user = await userResponse.json();

// //         const container = document.querySelector('.container');
// //         container.innerHTML = '<h1>College Clubs</h1>'; // Reset container with header

// //         // Iterate through clubs and render each club
// //         for (const club of clubs) {
// //             const clubDiv = document.createElement('div');
// //             clubDiv.className = 'club';
// //             clubDiv.id = `${club.name.replace(/\s+/g, '')}Club`; // Generate unique ID

// //             clubDiv.innerHTML = `
// //                 <h2>${club.name}</h2>
// //                 <p class="description">${club.description}</p>
// //                 <p class="eligibility">Eligible for: ${club.eligibility}</p>
// //                 <button class="request-btn" onclick="openRequestModal('${club.name}')">Request to Join</button>
// //             `;

// //             container.appendChild(clubDiv);

// //             // Check if the user has already requested to join this club
// //             const button = clubDiv.querySelector('.request-btn');
// //             try {
// //                 const requestStatusResponse = await fetch(`/club/check-join-request?userEmail=${user.email}&clubName=${encodeURIComponent(club.name)}`);
// //                 const statusData = await requestStatusResponse.json();

// //                 if (statusData.requested) {
// //                     button.textContent = 'Request Sent';
            
// //                     button.disabled = true; // Disable the button to indicate the request was sent
// //                 }
// //             } catch (statusError) {
// //                 console.error(`Error checking request status for ${club.name}:`, statusError);
// //             }
// //         }
// //     } catch (error) {
// //         console.error('Error fetching clubs:', error);
// //     }
// // }
// // document.getElementById('clubName').textContent = clubName;

// // // Open request modal
// // function openRequestModal(clubName) {
// //     console.log("hiii,",clubName);
// //     console.log(document.getElementById('clubName'));

// //     document.getElementById('clubName').textContent = clubName;
// //     document.getElementById('modalOverlay').style.display = 'block';
// //     document.getElementById('requestModal').style.display = 'block';
// // }

// // // Close request modal
// // function closeRequestModal() {
// //     document.getElementById('requestModal').style.display = 'none';
// // }

// // // Handle form submission
// // // document.getElementById('requestForm').addEventListener('submit', function(event) {
// // //     event.preventDefault();

// // //     const contribution = document.getElementById('contribution').value;
// // //     const clubName = document.getElementById('clubName').textContent;

// // //     console.log(`Requesting to join ${clubName} with contribution: ${contribution}`);

// // //     alert(`Your request to join ${clubName} has been submitted!`);

// // //     // Clear the form and close modal
// // //     document.getElementById('contribution').value = '';
// // //     closeRequestModal();
// // // });
// // // Handle form submission
// // document.getElementById('requestForm').addEventListener('submit', async function (event) {
// //     event.preventDefault();

// //     const contribution = document.getElementById('contribution').value;
// //     const clubName = document.getElementById('clubName').textContent;

// //     try {
// //         // Fetch user details
// //         const userResponse = await fetch('/get-user-info');
// //         if (!userResponse.ok) throw new Error('User not authenticated');
// //         const user = await userResponse.json();

// //         // Submit join request
// //         const requestResponse = await fetch('/club/submit-join-request', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({
// //                 userName: user.name,
// //                 userEmail: user.email,
// //                 userPhone: user.phone,
// //                 clubName,
// //                 contribution,
// //             }),
// //         });

// //         if (requestResponse.ok) {
// //             alert(`Your request to join ${clubName} has been submitted!`);
// //         } else {
// //             const errorData = await requestResponse.json();
// //             console.error('Error submitting request:', errorData);
// //             alert('Failed to submit request. Please try again.');
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //         alert('An error occurred. Please ensure you are logged in and try again.');
// //     }

// //     // Clear the form and close modal
// //     document.getElementById('contribution').value = '';
// //     closeRequestModal();
// // });

// // // Fetch and render clubs on page load
// // window.onload = fetchAndRenderClubs;
// // Function to check if a request is already sent
// async function checkRequestStatus( clubName, buttonElement) {
//     try {
//         const userResponse = await fetch('/get-user-info');
//         const user = await userResponse.json();
//         const response = await fetch(`/club/check-join-request?userEmail=${user.email}&clubName=${encodeURIComponent(clubName)}`);
//         const data = await response.json();
       
//         if (data.requested) {
//             buttonElement.textContent = 'Request Sent';
//             buttonElement.disabled = true; // Optionally disable the button
//         }
//     } catch (error) {
//         console.error('Error checking request status:', error);
//     }
// }

// // Call the check function for each club
// document.querySelectorAll('.request-btn').forEach(button => {
   
//     const clubName = button.getAttribute('data-club-name'); // Assume buttons have data attributes for club names
//     // fconst userEmail = 'user@example.com'; // Replace with the actual logged-in user's email

//     checkRequestStatus(clubName, button);
// });

// // Fetch clubs from the server and render them
// async function fetchAndRenderClubs() {
//     try {
//         // Fetch the list of all clubs
//         const response = await fetch('/club/clubs');
//         const clubs = await response.json();

//         // Fetch user information once
//         const userResponse = await fetch('/get-user-info');
//         const user = await userResponse.json();

//         const container = document.querySelector('.container');
//         container.innerHTML = '<h1>College Clubs</h1>'; // Reset container with header

//         // Iterate through clubs and render each club
//         for (const club of clubs) {
//             const clubDiv = document.createElement('div');
//             clubDiv.className = 'club';
//             clubDiv.id =`${club.name.replace(/\s+/g, '')}Club`; // Generate unique ID

//             clubDiv.innerHTML = 
//                `<h2>${club.name}</h2>
//                <p class="description">${club.description}</p>
//                <p class="eligibility">Eligible for: ${club.eligibility}</p>
//                <button class="request-btn" onclick="openRequestModal('${club.name}')">Request to Join</button>` 
//             ;

//             container.appendChild(clubDiv);

//             // Check if the user has already requested to join this club
//             const button = clubDiv.querySelector('.request-btn');
//             try {
//                 const requestStatusResponse = await fetch(`/club/check-join-request?userEmail=${user.email}&clubName=${encodeURIComponent(club.name)}`);
//                 const statusData = await requestStatusResponse.json();

//                 if (statusData.requested) {
//                     button.textContent = 'Request Sent';
            
//                     button.disabled = true; // Disable the button to indicate the request was sent
//                 }
//             } catch (statusError) {
//                 console.error(`Error checking request status for ${club.name}:, statusError`);
//             }
//         }
//     }
//      catch (error) {
//         console.error('Error fetching clubs:', error);
//     }
// }

// // Open request modal
// function openRequestModal(clubName) {
//     document.getElementById('clubName').textContent = clubName;
//     document.getElementById('requestModal').style.display = 'block';
// }

// // Close request modal
// function closeRequestModal() {
//     document.getElementById('requestModal').style.display = 'none';
// }

// // Handle form submission
// // document.getElementById('requestForm').addEventListener('submit', function(event) {
// //     event.preventDefault();

// //     const contribution = document.getElementById('contribution').value;
// //     const clubName = document.getElementById('clubName').textContent;

// //     console.log(Requesting to join ${clubName} with contribution: ${contribution});

// //     alert(Your request to join ${clubName} has been submitted!);

// //     // Clear the form and close modal
// //     document.getElementById('contribution').value = '';
// //     closeRequestModal();
// // });
// // Handle form submission
// document.getElementById('requestForm').addEventListener('submit', async function (event) {
//     event.preventDefault();

//     const contribution = document.getElementById('contribution').value;
//     const clubName = document.getElementById('clubName').textContent;

//     try {
//         // Fetch user details
//         const userResponse = await fetch('/get-user-info');
//         if (!userResponse.ok) throw new Error('User not authenticated');
//         const user = await userResponse.json();

//         // Submit join request
//         const requestResponse = await fetch('/club/submit-join-request', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 userName: user.name,
//                 userEmail: user.email,
//                 userPhone: user.phone,
//                 clubName,
//                 contribution,
//             }),
//         });

//         if (requestResponse.ok) {
//             alert(`Your request to join ${clubName} has been submitted!`);
//         } else {
//             const errorData = await requestResponse.json();
//             console.error('Error submitting request:', errorData);
//             alert('Failed to submit request. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please ensure you are logged in and try again.');
//     }

//     // Clear the form and close modal
//     document.getElementById('contribution').value = '';
//     closeRequestModal();
// });


// window.onload = fetchAndRenderClubs; 


async function checkRequestStatus( clubName, buttonElement) {
    try {
        const userResponse = await fetch('/get-user-info');
        const user = await userResponse.json();
        const response = await fetch(`/club/check-join-request?userEmail=${user.email}&clubName=${encodeURIComponent(clubName)}`);
        const data = await response.json();
       
        if (data.requested) {
            buttonElement.textContent = 'Request Sent';
            buttonElement.disabled = true; // Optionally disable the button
        }
    } catch (error) {
        console.error('Error checking request status:', error);
    }
}

// Call the check function for each club
document.querySelectorAll('.request-btn').forEach(button => {
   
    const clubName = button.getAttribute('data-club-name'); // Assume buttons have data attributes for club names
    // fconst userEmail = 'user@example.com'; // Replace with the actual logged-in user's email

    checkRequestStatus(clubName, button);
});

// Fetch clubs from the server and render them
// async function fetchAndRenderClubs() {
//     try {
//         // Fetch the list of all clubs
//         const response = await fetch('/club/clubs');
//         const clubs = await response.json();

//         // Fetch user information once
//         const userResponse = await fetch('/get-user-info');
//         const user = await userResponse.json();

//         const container = document.querySelector('.container');
//         container.innerHTML = '<h1>College Clubs</h1>'; // Reset container with header

//         // Iterate through clubs and render each club
//         for (const club of clubs) {
//             const clubDiv = document.createElement('div');
//             clubDiv.className = 'club';
//             clubDiv.id = `${club.name.replace(/\s+/g, '')}Club`; // Generate unique ID

//             clubDiv.innerHTML = `
//                 <h2>${club.name}</h2>
//                 <p class="description">${club.description}</p>
//                 <p class="eligibility">Eligible for: ${club.eligibility}</p>
//                 <button class="request-btn" onclick="openRequestModal('${club.name}')">Request to Join</button>
//             `;

//             container.appendChild(clubDiv);

//             // Check if the user has already requested to join this club
//             const button = clubDiv.querySelector('.request-btn');
//             try {
//                 const requestStatusResponse = await fetch(`/club/check-join-request?userEmail=${user.email}&clubName=${encodeURIComponent(club.name)}`);
//                 const statusData = await requestStatusResponse.json();

//                 if (statusData.requested) {
//                     button.textContent = 'Request Sent';
            
//                     button.disabled = true; // Disable the button to indicate the request was sent
//                 }
//             } catch (statusError) {
//                 console.error(`Error checking request status for ${club.name}:, statusError`);
//             }
//         }
//     } catch (error) {
//         console.error('Error fetching clubs:', error);
//     }
// }

// // Open request modal
// function openRequestModal(clubName) {
//     document.addEventListener('DOMContentLoaded', () => {
//         console.log("hiiiidhsiucvsf");
//     document.getElementById('clubName').textContent = clubName;
//     document.getElementById('requestModal').style.display = 'block';
//     });
// }

// // Close request modal
// function closeRequestModal() {
//     document.getElementById('requestModal').style.display = 'none';
// }

// Handle form submission
// document.getElementById('requestForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const contribution = document.getElementById('contribution').value;
//     const clubName = document.getElementById('clubName').textContent;

//     console.log(Requesting to join ${clubName} with contribution: ${contribution});

//     alert(Your request to join ${clubName} has been submitted!);

//     // Clear the form and close modal
//     document.getElementById('contribution').value = '';
//     closeRequestModal();
// });
// Handle form submission
// document.getElementById('requestForm').addEventListener('submit', async function (event) {
//     event.preventDefault();

//     const contribution = document.getElementById('contribution').value;
//     const clubName = document.getElementById('clubName').textContent;

//     try {
//         // Fetch user details
//         const userResponse = await fetch('/get-user-info');
//         if (!userResponse.ok) throw new Error('User not authenticated');
//         const user = await userResponse.json();

//         // Submit join request
//         const requestResponse = await fetch('/club/submit-join-request', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 userName: user.name,
//                 userEmail: user.email,
//                 userPhone: user.phone,
//                 clubName,
//                 contribution,
//             }),
//         });

//         if (requestResponse.ok) {
//             alert(`Your request to join ${clubName} has been submitted!`);
//         } else {
//             const errorData = await requestResponse.json();
//             console.error('Error submitting request:', errorData);
//             alert('Failed to submit request. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please ensure you are logged in and try again.');
//     }

//     // Clear the form and close modal
//     document.getElementById('contribution').value = '';
//     closeRequestModal();
// });

// // Fetch and render clubs on page load



//     // All your JavaScript code here
//     window.onload = fetchAndRenderClubs;

// Fetch clubs from the server and render them
async function fetchAndRenderClubs() {
    try {
        const response = await fetch('/club/clubs');
        const clubs = await response.json();

        const container = document.querySelector('.container');
        container.innerHTML = '<h1>College Clubs</h1>'; // Reset container with header

        // Dynamically create and append each club's card
        clubs.forEach(club => {
            const clubDiv = document.createElement('div');
            clubDiv.className = 'club';
            clubDiv.id = `${club.name.replace(/\s+/g, '')}Club`; // Generate unique ID

            clubDiv.innerHTML = `
                <h2>${club.name}</h2>
                <p class="description">${club.description}</p>
                <p class="eligibility">Eligible for: ${club.eligibility}</p>
                <button class="request-btn" data-club-name="${club.name}">Request to Join</button>
            `;

            container.appendChild(clubDiv);
        });

        // Add event listeners to all "Request to Join" buttons
        document.querySelectorAll('.request-btn').forEach(button => {
            button.addEventListener('click', handleRequestButtonClick);
        });
    } catch (error) {
        console.error('Error fetching clubs:', error);
    }
}

function handleRequestButtonClick(event) {
    const clubName = event.target.getAttribute('data-club-name');
    console.log(`Request to join clicked for: ${clubName}`); // Debugging log
    openRequestModal(clubName);
}


// open the request modal
function openRequestModal(clubName) {
    const modal = document.getElementById('requestModal');
    const clubNameElement = document.getElementById('clubName');
    console.log("harshi+",modal);
    if (modal && clubNameElement) {
        clubNameElement.textContent = clubName;
        modal.style.display = 'block';
    } else {
        console.error('Modal or club name element not found.');
    }
}

// Close the request modal
function closeRequestModal() {
    const modal = document.getElementById('requestModal');
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error('Modal element not found.');
    }
}

// Handle form submission
document.getElementById('requestForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const contribution = document.getElementById('contribution').value;
    const clubName = document.getElementById('clubName').textContent;

    try {
        const userResponse = await fetch('/get-user-info');
        const user = await userResponse.json();

        const requestResponse = await fetch('/club/submit-join-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: user.name,
                userEmail: user.email,
                userPhone: user.phone,
                clubName,
                contribution,
            }),
        });

        if (requestResponse.ok) {
            alert(`Your request to join ${clubName} has been submitted!`);
        } else {
            alert('Failed to submit request. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }

    // Clear the form and close modal
    document.getElementById('contribution').value = '';
    closeRequestModal();
});

// Close the modal when clicking the close button
document.querySelector('.close-btn').addEventListener('click', closeRequestModal);

// Fetch and render clubs when the page loads
window.onload = fetchAndRenderClubs;