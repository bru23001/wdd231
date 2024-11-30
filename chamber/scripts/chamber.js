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

// Helper function for membership level
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
// Call displayCompanies when the page loads
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

const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Set current year and last modified date in footer
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const modalLinks = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const backdrop = document.querySelector('.modal-backdrop');
const closeButtons = document.querySelectorAll('.modal-close');
modalLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const modalId = link.getAttribute('data-modal');
        document.getElementById(modalId).classList.add('active');
        backdrop.classList.add('active');
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modals.forEach(modal => modal.classList.remove('active'));
        backdrop.classList.remove('active');
    });
});

backdrop.addEventListener('click', () => {
    modals.forEach(modal => modal.classList.remove('active'));
    backdrop.classList.remove('active');
});

const urlParams = new URLSearchParams(window.location.search);
document.getElementById('firstName').textContent = urlParams.get('firstName');
document.getElementById('lastName').textContent = urlParams.get('lastName');
document.getElementById('email').textContent = urlParams.get('email');
document.getElementById('mobilePhone').textContent = urlParams.get('mobilePhone');
document.getElementById('organization').textContent = urlParams.get('organization');
document.getElementById('timestamp').textContent = urlParams.get('timestamp');
