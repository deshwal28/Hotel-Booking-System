// Fetch available rooms and display them
const token = localStorage.getItem('token'); // Get the token from localStorage

if (token) {
  fetch('http://localhost:5000/api/booking/available', {
    headers: {
      'Authorization': `Bearer ${token}` // Add token for authentication
    }
  })
    .then(response => response.json())
    .then(rooms => {
      const roomList = document.getElementById('availableRooms');
      roomList.innerHTML = ''; // Clear previous rooms

      rooms.forEach(room => {
        const listItem = document.createElement('li');
        listItem.textContent = `Room ${room.roomNumber} (Floor ${room.floor})`;
        roomList.appendChild(listItem);
      });
    })
    .catch(err => {
      console.error("Error fetching rooms:", err);
    });
} else {
  alert('Please log in first!');
  // Redirect to login page if needed
}

// Handle form submission to make a booking
document.getElementById('bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const customerName = document.getElementById('customerName').value;
  const roomNumbers = document.getElementById('roomNumbers').value.split(',').map(Number);
  const bookingDate = document.getElementById('bookingDate').value; // Get the booking date

  fetch('http://localhost:5000/api/booking/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add the token for authentication
    },
    body: JSON.stringify({ customerName, roomNumbers, bookingDate }) // Send bookingDate
  })
    .then(response => response.json())
    .then(data => {
      const messageBox = document.getElementById('messageBox');
      messageBox.className = ''; // Clear existing classes

      if (data.message) {
        messageBox.textContent = data.message;
        messageBox.classList.add('success'); // Add success class
      } else if (data.error) {
        messageBox.textContent = data.error;
        messageBox.classList.add('error'); // Add error class
      }
    })
    .catch(err => {
      console.error("Error while booking:", err);
      const messageBox = document.getElementById('messageBox');
      messageBox.textContent = 'An error occurred while making the booking.';
      messageBox.classList.add('error');
    });
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token'); // Clear the token
  alert('Logged out successfully!');
  window.location.reload(); // Refresh the page after logout
});

