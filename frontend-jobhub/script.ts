// script.ts

function validateLogin(): boolean {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const errorMessage = document.getElementById('error-message') as HTMLElement;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username === '' || password === '') {
        errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }

    if (!emailRegex.test(username)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return false;
    }

    // Assuming the form is valid, you can redirect to the dashboard
    window.location.href = 'Dashboard.html'; // Replace 'dashboard.html' with your actual dashboard page

    return false; // Prevents the form from submitting (you may remove this line if you want to submit the form)
}

function validateRegistration(): boolean {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const errorMessage = document.getElementById('error-message') as HTMLElement;

    // Perform validation checks (add more if needed)
    if (username === '' || email === '' || password === '') {
        errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }

    // Assuming the form is valid, you can redirect to the dashboard
    window.location.href = 'Dashboard.html'; // Replace 'dashboard.html' with your actual dashboard page

    return false; // Prevents the form from submitting (you may remove this line if you want to submit the form)
}

const form:any = document.querySelector('form');

form.addEventListener('submit', function (event) {
    const jobTitleInput:any = document.getElementById('jobTitle');
    const jobDescriptionInput:any = document.getElementById('jobDescription');
    const paymentInput:any = document.getElementById('payment');
    const errorMessage:any = document.getElementById('error-message');

    if (!jobTitleInput.value.trim() || !jobDescriptionInput.value.trim() || !paymentInput.value.trim()) {
        event.preventDefault(); // Prevent form submission

        // Display error message
        errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }
});
