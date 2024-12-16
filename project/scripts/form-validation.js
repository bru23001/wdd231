/*====================================================================================
====================================FORM_VALIDATION_JS================================
====================================================================================*/

/**
 * Form validation and handling module for Your Book Club website.
 * Provides real-time validation, error handling, and submission management.
 */

class FormValidation {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;

        this.errorMessages = {
            required: 'This field is required.',
            email: 'Please enter a valid email address.',
            password: 'Password must be at least 8 characters with numbers and letters.',
            minLength: (min) => `Must be at least ${min} characters.`,
            maxLength: (max) => `Must be no more than ${max} characters.`,
            phone: 'Please enter a valid phone number.',
            zip: 'Please enter a valid ZIP code.',
            match: 'Passwords do not match.',
            generic: 'Please check this field.'
        };

        this.validationRules = {
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
            phone: (value) => /^\+?[\d\s-]{10,}$/.test(value),
            zip: (value) => /^\d{5}(-\d{4})?$/.test(value)
        };

        this.setupValidation();
        this.loadSavedData();
    }

    /**
     * Initialize form validation and event listeners
     */
    setupValidation() {
        // Debounce function for real-time validation
        const debounce = (func, wait) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        };

        // Add real-time validation to all form fields
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', debounce((e) => this.validateField(e.target), 300));
            field.addEventListener('blur', (e) => this.validateField(e.target));
        });

        // Handle form submission
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (await this.validateForm()) {
                this.handleSubmission();
            }
        });

        // Handle password confirmation if exists
        const passwordConfirm = this.form.querySelector('input[name="password_confirm"]');
        if (passwordConfirm) {
            passwordConfirm.addEventListener('input', () => {
                const password = this.form.querySelector('input[name="password"]');
                this.validatePasswordMatch(password, passwordConfirm);
            });
        }
    }

    /**
     * Validate a single form field
     * @param {HTMLElement} field - Form field to validate
     * @returns {boolean} - Validation result
     */
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error message
        this.removeError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = this.errorMessages.required;
        }
        // Specific field type validation
        else if (value) {
            switch (field.type) {
                case 'email':
                    isValid = this.validationRules.email(value);
                    errorMessage = this.errorMessages.email;
                    break;
                case 'password':
                    isValid = this.validationRules.password(value);
                    errorMessage = this.errorMessages.password;
                    break;
                case 'tel':
                    isValid = this.validationRules.phone(value);
                    errorMessage = this.errorMessages.phone;
                    break;
            }

            // Minlength validation
            if (field.getAttribute('minlength')) {
                const minLength = parseInt(field.getAttribute('minlength'));
                if (value.length < minLength) {
                    isValid = false;
                    errorMessage = this.errorMessages.minLength(minLength);
                }
            }

            // Maxlength validation
            if (field.getAttribute('maxlength')) {
                const maxLength = parseInt(field.getAttribute('maxlength'));
                if (value.length > maxLength) {
                    isValid = false;
                    errorMessage = this.errorMessages.maxLength(maxLength);
                }
            }
        }

        // Show error if validation failed
        if (!isValid) {
            this.showError(field, errorMessage);
        }

        // Update field styling
        field.classList.toggle('valid', isValid);
        field.classList.toggle('invalid', !isValid);

        return isValid;
    }

    /**
     * Validate password match
     * @param {HTMLElement} password - Password field
     * @param {HTMLElement} confirm - Password confirmation field
     * @returns {boolean} - Validation result
     */
    validatePasswordMatch(password, confirm) {
        const isMatch = password.value === confirm.value;
        if (!isMatch) {
            this.showError(confirm, this.errorMessages.match);
        } else {
            this.removeError(confirm);
        }
        return isMatch;
    }

    /**
     * Validate entire form
     * @returns {Promise<boolean>} - Form validation result
     */
    async validateForm() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;

        // Validate all fields
        for (const field of fields) {
            if (!this.validateField(field)) {
                isValid = false;
            }
        }

        // Check password match if applicable
        const password = this.form.querySelector('input[name="password"]');
        const confirm = this.form.querySelector('input[name="password_confirm"]');
        if (password && confirm && !this.validatePasswordMatch(password, confirm)) {
            isValid = false;
        }

        return isValid;
    }

    /**
     * Handle form submission
     */
    async handleSubmission() {
        try {
            const submitButton = this.form.querySelector('[type="submit"]');
            submitButton.disabled = true;
            submitButton.classList.add('loading');

            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());

            // Save to localStorage
            this.saveFormData(data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.showSuccess('Form submitted successfully!');
            this.form.reset();

        } catch (error) {
            console.error('Submission error:', error);
            this.showError(this.form, 'Submission failed. Please try again.');
        } finally {
            const submitButton = this.form.querySelector('[type="submit"]');
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    }

    /**
     * Show error message for a field
     * @param {HTMLElement} field - Field to show error for
     * @param {string} message - Error message
     */
    showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
        field.setAttribute('aria-invalid', 'true');
    }

    /**
     * Remove error message from a field
     * @param {HTMLElement} field - Field to remove error from
     */
    removeError(field) {
        const error = field.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        field.setAttribute('aria-invalid', 'false');
    }

    /**
     * Show success message
     * @param {string} message - Success message
     */
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.setAttribute('role', 'alert');
        successDiv.textContent = message;
        
        this.form.insertBefore(successDiv, this.form.firstChild);
        setTimeout(() => successDiv.remove(), 3000);
    }

    /**
     * Save form data to localStorage
     * @param {Object} data - Form data to save
     */
    saveFormData(data) {
        try {
            const formId = this.form.id;
            localStorage.setItem(`${formId}_data`, JSON.stringify({
                data,
                timestamp: new Date().toISOString()
            }));
        } catch (error) {
            console.error('Error saving form data:', error);
        }
    }

    /**
     * Load saved form data from localStorage
     */
    loadSavedData() {
        try {
            const formId = this.form.id;
            const saved = localStorage.getItem(`${formId}_data`);
            if (saved) {
                const { data } = JSON.parse(saved);
                Object.entries(data).forEach(([name, value]) => {
                    const field = this.form.querySelector(`[name="${name}"]`);
                    if (field && field.type !== 'password') {
                        field.value = value;
                    }
                });
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // List of forms to validate
    const forms = [
        'newsletter-form',
        'contact-form',
        'login-form',
        'registration-form'
    ];

    // Initialize validation for each form
    forms.forEach(formId => {
        if (document.getElementById(formId)) {
            new FormValidation(formId);
        }
    });
});