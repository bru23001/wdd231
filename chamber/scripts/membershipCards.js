// Import utilities
import { setLocalStorage, getLocalStorage } from './utils.js';

class MembershipManager {
    constructor() {
        this.cards = document.querySelector('.membership-cards');
        this.form = document.querySelector('form');
        this.levels = {
            np: {
                name: 'Non-Profit',
                fee: 0,
                benefits: ['Networking events', 'Online directory listing', 'Monthly newsletter']
            },
            bronze: {
                name: 'Bronze',
                fee: 50,
                benefits: ['NP benefits plus:', 'Business workshops', 'Social media features']
            },
            silver: {
                name: 'Silver',
                fee: 100,
                benefits: ['Bronze benefits plus:', 'Directory spotlight', 'Event discounts']
            },
            gold: {
                name: 'Gold',
                fee: 200,
                benefits: ['Silver benefits plus:', 'Homepage spotlight', 'Premium event access']
            }
        };
        this.init();
    }

    init() {
        this.setupCardAnimations();
        this.loadSavedMembership();
        this.setupEventListeners();
    }

    setupCardAnimations() {
        if (this.cards) {
            // Initial load animation
            this.cards.classList.add('loaded');
            
            // Add hover animations
            this.cards.querySelectorAll('.membership-card').forEach(card => {
                card.addEventListener('mouseenter', () => this.animateCard(card));
            });
        }
    }

    animateCard(card) {
        card.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
        }, 300);
    }

    loadSavedMembership() {
        const savedLevel = getLocalStorage('membershipLevel');
        if (savedLevel && this.form) {
            const dropdown = this.form.querySelector('#membershipLevel');
            if (dropdown) dropdown.value = savedLevel;
        }
    }

    getMembershipDetails(level) {
        return this.levels[level] || this.levels.np;
    }

    calculatePrice(level, duration = 12) {
        const details = this.getMembershipDetails(level);
        return details.fee * duration;
    }

    setupEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Level selection handlers
        document.querySelectorAll('.membership-card').forEach(card => {
            card.addEventListener('click', () => {
                const level = card.dataset.level;
                this.selectMembership(level);
            });
        });
    }

    selectMembership(level) {
        const details = this.getMembershipDetails(level);
        const dropdown = document.querySelector('#membershipLevel');
        if (dropdown) {
            dropdown.value = level;
            this.updatePriceDisplay(level);
        }
        
        // Highlight selected card
        document.querySelectorAll('.membership-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.level === level);
        });
    }

    updatePriceDisplay(level) {
        const priceElement = document.querySelector('#membershipPrice');
        if (priceElement) {
            const price = this.calculatePrice(level);
            priceElement.textContent = `$${price}/year`;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const level = formData.get('membershipLevel');

        try {
            setLocalStorage('membershipLevel', level);
            setLocalStorage('membershipDetails', this.getMembershipDetails(level));
            window.location.href = 'thankyou.html';
        } catch (error) {
            console.error('Error saving membership:', error);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new MembershipManager();
});

export { MembershipManager };



document.addEventListener("DOMContentLoaded", () => {
    const membershipLevel = localStorage.getItem("membershipLevel");
    if (membershipLevel) {
        const dropdown = document.getElementById("membershipLevel");
        dropdown.value = membershipLevel;
    }
});


/* document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Capture the selected membership level
    const membershipLevel = document.getElementById("membershipLevel").value;

    // Save the membership level to localStorage or use it directly
    localStorage.setItem("membershipLevel", membershipLevel);

    // Redirect to the thank-you page (example)
    window.location.href = "thankyou.html";
});


function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return 'Silver';
        case 2:
            return 'Gold';
        case 3:
            return 'Platinum';
        default:
            return 'Unknown';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const membershipCards = document.querySelector(".membership-cards");
    if (membershipCards) {
        // Add the "loaded" class to trigger the CSS animation
        membershipCards.classList.add("loaded");
    }
});
 */