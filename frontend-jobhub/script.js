// script.ts
function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username === '' || password === '') {
        errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }
    if (!emailRegex.test(username)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return false;
    }
    window.location.href = 'Dashboard.html'; 
    return false; 
}
function validateRegistration() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');
    if (username === '' || email === '' || password === '') {
        errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }
    
    window.location.href = 'Dashboard.html'; 
    return false; 
}
var form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    var jobTitleInput = document.getElementById('jobTitle');
    var jobDescriptionInput = document.getElementById('jobDescription');
    var paymentInput = document.getElementById('payment');
    var errorMessage = document.getElementById('error-message');
    if (!jobTitleInput.value.trim() || !jobDescriptionInput.value.trim() || !paymentInput.value.trim()) {
        event.preventDefault(); 
        errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }
});
