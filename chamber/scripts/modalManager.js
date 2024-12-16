
class ModalManager {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.triggers = document.querySelectorAll('.learn-more-btn');
        this.closeButtons = document.querySelectorAll('.close-modal');
        this.init();
    }

    init() {
        this.setupTriggers();
        this.setupCloseButtons();
        this.setupOutsideClicks();
        this.setupKeyboardHandling();
    }

    setupTriggers() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });
    }

    setupCloseButtons() {
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal(button.closest('.modal'));
            });
        });
    }

    setupOutsideClicks() {
        this.modals.forEach(modal => {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    setupKeyboardHandling() {
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }

    closeModal(modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        
        const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
        if (trigger) {
            trigger.focus();
        }
    }

    closeAllModals() {
        this.modals.forEach(modal => this.closeModal(modal));
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ModalManager();
});

export { ModalManager };



/* document.addEventListener('DOMContentLoaded', () => {
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

}) */