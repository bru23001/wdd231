

// Import utilities
import { displayError } from './utils.js';

// Validation patterns
const patterns = {
    title: /^[a-zA-Z\s-]{7,}$/,
    phone: /^\d{10}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    firstName: /^[a-zA-Z\s-]{2,}$/,
    lastName: /^[a-zA-Z\s-]{2,}$/
};

const errorMessages = {
    firstName: 'First name is required (min 2 characters)',
    lastName: 'Last name is required (min 2 characters)',
    title: 'Title must be at least 7 characters, letters, spaces, and hyphens only',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid 10-digit phone number',
    organization: 'Business/Organization name is required',
    membershipLevel: 'Please select a membership level',
    description: 'Please provide a business description'
};

class FormValidator {
    constructor(form) {
        this.form = form;
        this.setupValidation();
    }

    setupValidation() {
        this.form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.validateField(input));
        });

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(field) {
        // Remove existing errors
        this.removeError(field);

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.createError(field, errorMessages[field.name]);
            return false;
        }

        // Pattern validation
        if (patterns[field.name] && !patterns[field.name].test(field.value)) {
            this.createError(field, errorMessages[field.name]);
            return false;
        }

        // Custom validations
        if (field.name === 'description' && field.value.length < 10) {
            this.createError(field, errorMessages.description);
            return false;
        }

        return true;
    }

    createError(field, message) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        field.parentElement.appendChild(errorElement);
        field.setAttribute('aria-invalid', 'true');
    }

    removeError(field) {
        const error = field.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
            field.removeAttribute('aria-invalid');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        let isValid = true;

        // Validate all fields
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            try {
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData.entries());
                
                // Add timestamp
                data.timestamp = new Date().toISOString();
                
                // Store in localStorage
                localStorage.setItem('formData', JSON.stringify(data));
                
                // Redirect to thank you page
                window.location.href = 'thankyou.html';
            } catch (error) {
                console.error('Form submission error:', error);
                displayError(this.form, 'There was an error submitting the form. Please try again.');
            }
        } else {
            const firstError = this.form.querySelector('[aria-invalid="true"]');
            if (firstError) {
                firstError.focus();
            }
        }
    }
}



// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    const membershipForm = document.querySelector('form');
    if (membershipForm) {
        new FormValidator(membershipForm);
    }
});

export { FormValidator, patterns, errorMessages };




/* document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const membershipCards = document.querySelector('.membership-cards');
    const modals = document.querySelectorAll('.modal');
    const timestampInput = document.getElementById('timestamp');

    // Set timestamp when form loads
    timestampInput.value = new Date().toISOString();

    



    // Validate single input
    function validateInput(input) {
        if (input.hasAttribute('required') && !input.value) {
            createError(input, errorMessages[input.name]);
            return false;
        }

        if (input.name in patterns && !patterns[input.name].test(input.value)) {
            createError(input, errorMessages[input.name]);
            return false;
        }

        removeError(input);
        return true;
    }

    // Add real-time validation
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => validateInput(input));
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all inputs
        form.querySelectorAll('input, select, textarea').forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Create form data object
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Store data in localStorage for thank you page
            localStorage.setItem('formData', JSON.stringify(data));

            // Redirect to thank you page
            window.location.href = 'thankyou.html';
        }
    });




    

    // Create and append error element
    function createError(input, message) {
        const existing = input.parentElement.querySelector('.error-message');
        if (!existing) {
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;
            input.parentElement.appendChild(error);
        }
    }

    // Remove error element
    function removeError(input) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }
}) */