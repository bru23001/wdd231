// ===================================================================================
// ============================ MODAL MANAGER =======================================
// ===================================================================================
/**
 * This module manages the behavior of modals on the Chamber website, 
 * including opening, closing, and interaction logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    const modalButtons = document.querySelectorAll('.learn-more-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open modal
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'flex';
        });
    });

    // Close modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('firstName').textContent = urlParams.get('firstName');
    document.getElementById('lastName').textContent = urlParams.get('lastName');
    document.getElementById('email').textContent = urlParams.get('email');
    document.getElementById('mobilePhone').textContent = urlParams.get('mobilePhone');
    document.getElementById('organization').textContent = urlParams.get('organization');
    document.getElementById('timestamp').textContent = urlParams.get('timestamp');

    document.addEventListener('DOMContentLoaded', () => {
        const timestampInput = document.getElementById('timestamp');
        if (timestampInput) {
            timestampInput.value = new Date().toISOString();
        }
    });
})