function displayErrorMessage(message) {
    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
      errorContainer.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
    } else {
      console.error(`Error: ${message}`);
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    const userToken = localStorage.getItem('userToken');
    userId = localStorage.getItem('userId'); 
    console.log('User information from localStorage:', { userToken, userId });
     if (!userToken || !userId) {
      } else {
      console.log('User information is available. Proceeding with the API call.');
            }
      });
    document.addEventListener('DOMContentLoaded', function () {
      const userToken = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      console.log('User information from localStorage:', { userToken, userId });
        if (!userToken || !userId) {
        console.error('UserToken or UserId not available');
        displayErrorMessage('User information not available. Redirecting to login.');
        setTimeout(function() {
          window.location.href = 'login.html';
        }, 3000);        } else {
        console.log('User information is available. Proceeding with the API call.');
          fetch(`http://localhost:2001/users/${userId}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        })
          .then(response => {
            console.log('Response status:', response.status);
              if (!response.ok) {
              return response.json().then(errorData => {
                throw new Error(errorData.message || 'Failed to fetch user profile');
              });
            }
              return response.json();
          })
          .then(profileData => {
            displayUserProfile(profileData);
            setupUpdateButtons(profileData);
          })
          .catch(error => {
            console.error('Error fetching user profile:', error);
            displayErrorMessage(`Failed to fetch user profile. Error: ${error.message}`);
          });
      }
    });
      function displayUserProfile(profileData) {
      const profileInfo = document.getElementById('profileInfo');
      profileInfo.innerHTML = `
          <div class="card mb-4">
              <div class="card-body">
                  <h5 class="card-title">User Information</h5>
                  <p class="card-text">ID: ${profileData.id}</p>
                  <p class="card-text">Username: ${profileData.username}</p>
                  <p class="card-text">Email: ${profileData.email}</p>
              </div>
          </div>
      `;
  }
    const displayUserJobsBtn = document.getElementById('displayUserJobsBtn');
    displayUserJobsBtn.addEventListener('click', function () {
    fetchUserJobs(userId, userToken); 
  });
      function setupUpdateButtons(profileData) {
      const updateUsernameBtn = document.getElementById('updateUsernameBtn');
      const updateEmailBtn = document.getElementById('updateEmailBtn');
      const usernameField = document.getElementById('usernameField');
      const emailField = document.getElementById('emailField');
        updateUsernameBtn.addEventListener('click', function () {
        const newUsername = prompt('Enter new username:');
        if (newUsername !== null) {
          updateUsernameOnBackend(newUsername)
            .then(updatedUsername => {
             usernameField.textContent = updatedUsername;
            })
            .catch(error => {
              console.error('Error updating username:', error);
            });
        }
      });
        updateEmailBtn.addEventListener('click', function () {
        const newEmail = prompt('Enter new email:');
        if (newEmail !== null) {
          updateEmailOnBackend(newEmail)
            .then(updatedEmail => {
              emailField.textContent = updatedEmail;
            })
            .catch(error => {
              console.error('Error updating email:', error);
            });
        }
      });
    }
     function updateUsernameOnBackend(username) {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');
     return fetch(`http://localhost:2001/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({ username }), 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update username on the backend');
        }
        return response.json();
      })
      .then(updatedUserData => {

        return updatedUserData.username;
      });
  }
  function updateEmailOnBackend(email) {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');
      return fetch(`http://localhost:2001/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({ email }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update email on the backend');
        }
        return response.json();
      })
      .then(updatedUserData => {
        return updatedUserData.email;
      });
  }
  function updateUsernameOnBackend(username) {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');
    return fetch(`http://localhost:2001/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ username }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update username on the backend');
            }
            return response.json();
        })
        .then(updatedUserData => {
            displayUserProfile(updatedUserData); 
            return updatedUserData.username;
        });
}
function updateEmailOnBackend(email) {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');
    return fetch(`http://localhost:2001/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ email }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update email on the backend');
            }
            return response.json();
        })
        .then(updatedUserData => {
            displayUserProfile(updatedUserData); 
            return updatedUserData.email;
        });
}
