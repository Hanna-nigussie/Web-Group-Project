function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() === "") {
      displayMessage('error', 'Please enter a username.');
      return;
    }

    if (password.trim() === "") {
      displayMessage('error', 'Please enter a password.');
      return;
    }

    const email = document.getElementById('email').value;

    const registrationData = {
      username,
      password,
      email,
    };

    fetch('http://localhost:2001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        return response.json();
      })
      .then(data => {
        displayMessage('success', 'Registration successful: ' + data.token);
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      })
      .catch(error => {
        displayMessage('error', 'Registration failed: ' + error.message);
      });
  }

  function displayMessage(type, message) {
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.innerHTML = `<p class="${type}-message">${message}</p>`;
  }