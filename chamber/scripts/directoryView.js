// Import utilities
import { displayError, getLocalStorage, setLocalStorage } from './utils.js';


class DirectoryManager {
    constructor() {
        this.businessList = document.querySelector('.business-cards');
        this.viewPreference = getLocalStorage('viewPreference') || 'grid';
        this.init();
    }

    async init() {
        await this.loadBusinessData();
        this.setupViewToggle();
        this.setupLazyLoading();
        this.applyViewPreference();
    }

    async loadBusinessData() {
        try {
            const response = await fetch('data/businesses.json');
            if (!response.ok) throw new Error('Failed to fetch business data');
            const companies = await response.json();
            
            const isIndexPage = window.location.pathname.includes('index.html');
            const companiesToDisplay = isIndexPage ? 
                this.getSpotlightCompanies(companies, 3) : 
                companies;
            
            this.renderCompanies(companiesToDisplay);
        } catch (error) {
            displayError(this.businessList, 'Error loading business data');
        }
    }

    getSpotlightCompanies(companies, count) {
        const premium = companies.filter(company => 
            company.membershipLevel >= 2
        );
        return this.shuffleArray(premium).slice(0, count);
    }

    shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    renderCompanies(companies) {
        this.businessList.innerHTML = companies.map(company => `
            <div class="card">
                <img src="${company.image}" 
                     alt="${company.name} Logo" 
                     class="business-image lazy"
                     data-src="${company.image}">
                <div class="contact-info">
                    <h4>${company.name}</h4>
                    <p class="subtitle">${company.subtitle}</p>
                    <p><strong>Address:</strong> ${company.address}</p>
                    <p><strong>Phone:</strong> ${company.phone}</p>
                    <p><strong>Email:</strong> <a href="mailto:${company.email}">${company.email}</a></p>
                    <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                    ${company.membershipLevel > 1 ? '<span class="premium-badge">Premium Member</span>' : ''}
                </div>
            </div>
        `).join('');
    }

    setupViewToggle() {
        const gridBtn = document.getElementById('grid');
        const listBtn = document.getElementById('list');

        if (gridBtn && listBtn) {
            gridBtn.addEventListener('click', () => this.setView('grid'));
            listBtn.addEventListener('click', () => this.setView('list'));
        }
    }

    setView(viewMode) {
        this.businessList.classList.remove('grid-view', 'list-view');
        this.businessList.classList.add(`${viewMode}-view`);
        setLocalStorage('viewPreference', viewMode);
    }

    applyViewPreference() {
        this.setView(this.viewPreference);
    }

    setupLazyLoading() {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            },
            { rootMargin: '50px' }
        );

        document.querySelectorAll('.lazy').forEach(img => 
            observer.observe(img)
        );
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new DirectoryManager();
});

export { DirectoryManager };


/* const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Set current year and last modified date in footer
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// ===================================================================================
// ========================= DIRECTORY VIEW TOGGLE ==================================
// ===================================================================================
/**
 * This module manages the toggle between grid and list views for the business 
 * directory on the Chamber website.
 

// Function to fetch and display companies from a JSON file
async function displayCompanies() {
    const businessList = document.querySelector('.business-cards');
    businessList.innerHTML = '';

    try {
        // Fetch data from the JSON file
        const response = await fetch('scripts/businesses.json');
        const companies = await response.json();

        // Determine the current page
        const isIndexPage = window.location.pathname.includes('index.html');

        // Limit to 3 companies if on index.html, otherwise show all
        const companiesToDisplay = isIndexPage ? companies.slice(0, 3) : companies;

        // Iterate over each company in the JSON data
        companiesToDisplay.forEach(company => {
            const companyCard = document.createElement('div');
            companyCard.classList.add('card');
            companyCard.innerHTML = `
                <img src="${company.image}" alt="${company.name} Logo" class="business-image">
                <div class="contact-info">
                    <h4>${company.name}</h4>
                    <p class="subtitle">${company.subtitle}</p>
                    <p><strong>Address:</strong> ${company.address}</p>
                    <p><strong>Phone:</strong> ${company.phone}</p>
                    <p><strong>Email:</strong> <a href="mailto:${company.email}">${company.email}</a></p>
                    <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                </div>
            `;
            businessList.appendChild(companyCard);
        });
    } catch (error) {
        console.error('Error fetching company data:', error);
        businessList.innerHTML = '<p>Error loading business data. Please try again later.</p>';
    }
}

/// Call displayCompanies when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCompanies();

    const gridBtn = document.getElementById('grid');
    const listBtn = document.getElementById('list');
    const businessCards = document.querySelector('.business-cards');

    gridBtn.addEventListener('click', () => {
        businessCards.classList.remove('list-view');
        businessCards.classList.add('grid-view');
    });

    listBtn.addEventListener('click', () => {
        businessCards.classList.remove('grid-view');
        businessCards.classList.add('list-view');
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        header.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded',
            menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            header.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});


// Toggle between grid and list view
async function toggleView() {
    try {
        const businessList = document.getElementById('business-list');
        businessList.classList.toggle('grid-view');
        businessList.classList.toggle('list-view');
    } catch (error) {
        console.error('Error toggling view:', error);
    }
}


// Lazy loading images
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => {
        observer.observe(img);
    });
});



 */