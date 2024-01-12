// script.ts
let userRole: string = 'EMPLOYER';

function validateLogin(): boolean {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    const errorMessage: HTMLElement | null = document.getElementById('error-message');
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username === '' || password === '') {
        if (errorMessage) errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }

    if (!emailRegex.test(username)) {
        if (errorMessage) errorMessage.textContent = 'Please enter a valid email address.';
        return false;
    }

    
    if (userRole === 'EMPLOYE') {
        window.location.href = 'Dashboardemploye.html';
    } else if (userRole === 'EMPLOYER') {
        window.location.href = 'Dashboardemployer.html';
    }

    return false; 
}

function validateRegistration(): boolean {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    const errorMessage: HTMLElement | null = document.getElementById('error-message');

    if (username === '' || email === '' || password === '') {
        if (errorMessage) errorMessage.textContent = 'All fields must be filled out.';
        return false;
    }

    if (userRole === 'EMPLOYE') {
        window.location.href = 'Dashboardemploye.html';
    } else if (userRole === 'EMPLOYER') {
        window.location.href = 'Dashboardemployer.html';
    }

    return false;
}

const form: HTMLFormElement | null = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function (event: Event) {
        const jobTitleInput: HTMLInputElement | null = document.getElementById('jobTitle') as HTMLInputElement;
        const jobDescriptionInput: HTMLInputElement | null = document.getElementById('jobDescription') as HTMLInputElement;
        const paymentInput: HTMLInputElement | null = document.getElementById('payment') as HTMLInputElement;
        const errorMessage: HTMLElement | null = document.getElementById('error-message');

        if (!jobTitleInput?.value.trim() || !jobDescriptionInput?.value.trim() || !paymentInput?.value.trim()) {
            event.preventDefault();
            if (errorMessage) errorMessage.textContent = 'All fields must be filled out.';
            return false;
        }
    });
}
