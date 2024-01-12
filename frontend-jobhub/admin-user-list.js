const adminToken = 'adminToken';
async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:2001/users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
function displayUsers(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  users.forEach(user => {
    const card = createUserCard(user);
    userList.innerHTML += card;
  });
  attachDeleteEventListeners();
}
function createUserCard(user) {
  return `
    <div class="card">
      <h2>${user.username}</h2>
      <p>Email: ${user.email}</p>
      <button class="delete-btn" data-userid="${user.id}">Delete</button>
    </div>
  `;
}
async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:2001/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    fetchUsers();
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
  }
}
function attachDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    const userId = button.getAttribute('data-userid');
    button.addEventListener('click', () => {
      deleteUser(userId);
    });
  });
}
document.addEventListener('DOMContentLoaded', fetchUsers);