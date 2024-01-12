// script.ts
var userRole = 'EMPLOYER';
function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username === '' || password === '') {
        if (errorMessage)
            errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }
    if (!emailRegex.test(username)) {
        if (errorMessage)
            errorMessage.textContent = 'Please enter a valid email address.';
        return false;
    }
    if (userRole === 'EMPLOYE') {
        window.location.href = 'Dashboardemploye.html';
    }
    else if (userRole === 'EMPLOYER') {
        window.location.href = 'Dashboardemployer.html';
    }
    return false;
}
function validateRegistration() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');
    if (username === '' || email === '' || password === '') {
        if (errorMessage)
            errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }
    if (userRole === 'EMPLOYE') {
        window.location.href = 'Dashboardemploye.html';
    }
    else if (userRole === 'EMPLOYER') {
        window.location.href = 'Dashboardemployer.html';
    }
    return false;
}
var form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function (event) {
        var jobTitleInput = document.getElementById('jobTitle');
        var jobDescriptionInput = document.getElementById('jobDescription');
        var paymentInput = document.getElementById('payment');
        var errorMessage = document.getElementById('error-message');
        if (!(jobTitleInput === null || jobTitleInput === void 0 ? void 0 : jobTitleInput.value.trim()) || !(jobDescriptionInput === null || jobDescriptionInput === void 0 ? void 0 : jobDescriptionInput.value.trim()) || !(paymentInput === null || paymentInput === void 0 ? void 0 : paymentInput.value.trim())) {
            event.preventDefault();
            if (errorMessage)
                errorMessage.textContent = 'All fields must be filled out.';
            return false;
        }
    });
}
