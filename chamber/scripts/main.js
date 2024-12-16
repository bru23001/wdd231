// Import managers
import { WeatherManager } from './weather.js';
import { DirectoryManager } from './directoryView.js';
import { MembershipManager } from './membershipCards.js';
import { FormValidator } from './formValidation.js';
import { setLocalStorage, getLocalStorage } from './utils.js';

class AppManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('index.html')) return 'home';
        if (path.includes('directory.html')) return 'directory';
        if (path.includes('join.html')) return 'join';
        if (path.includes('discover.html')) return 'discover';
        return 'home';
    }

    init() {
        // Initialize common elements
        this.setupFooter();
        this.setupNavigation();

        // Initialize page-specific features
        switch (this.currentPage) {
            case 'home':
                new WeatherManager();
                this.initializeSpotlights();
                break;
            case 'directory':
                new DirectoryManager();
                break;
            case 'join':
                new FormValidator(document.querySelector('form'));
                new MembershipManager();
                break;
            case 'discover':
                this.initializeDiscover();
                break;
        }
    }

    setupFooter() {
        const year = document.getElementById('current-year');
        const modified = document.getElementById('last-modified');
        if (year) year.textContent = new Date().getFullYear();
        if (modified) modified.textContent = document.lastModified;
    }

    setupNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show');
                menuToggle.setAttribute('aria-expanded', 
                    navMenu.classList.contains('show')
                );
            });
        }
    }

    async initializeSpotlights() {
        try {
            const response = await fetch('data/businesses.json');
            if (!response.ok) throw new Error('Failed to load business data');
            const businesses = await response.json();
            const spotlights = this.getRandomPremiumBusinesses(businesses, 3);
            this.displaySpotlights(spotlights);
        } catch (error) {
            console.error('Error loading spotlights:', error);
        }
    }

    getRandomPremiumBusinesses(businesses, count) {
        const premium = businesses.filter(b => b.membershipLevel >= 2);
        return premium.sort(() => Math.random() - 0.5).slice(0, count);
    }

    displaySpotlights(spotlights) {
        const container = document.querySelector('.company-spotlights');
        if (!container) return;

        container.innerHTML = spotlights.map(business => `
            <div class="spotlight-card">
                <img src="${business.image}" alt="${business.name}" loading="lazy">
                <h3>${business.name}</h3>
                <p>${business.subtitle}</p>
                <a href="${business.website}" target="_blank">Learn More</a>
            </div>
        `).join('');
    }

    initializeDiscover() {
        const lazyImages = document.querySelectorAll('.lazy');
        const imageObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            }
        );
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    new AppManager();
});

