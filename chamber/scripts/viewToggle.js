// ===================================================================================
// ========================= DIRECTORY VIEW TOGGLE ==================================
// ===================================================================================
/**
 * This module manages the toggle between grid and list views for the business 
 * directory on the Chamber website.
 */

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

document.addEventListener("DOMContentLoaded", () => {
    const membershipCards = document.querySelector(".membership-cards");
    if (membershipCards) {
        // Add the "loaded" class to trigger the CSS animation
        membershipCards.classList.add("loaded");
    }
});

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

// Visitor tracking
const visitorMessage = document.getElementById("visitorMessage");

function getDaysBetween(date1, date2) {
    return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
}

const lastVisit = localStorage.getItem("lastVisit");
const currentDate = Date.now();

if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = getDaysBetween(Number(lastVisit), currentDate);
    if (days < 1) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        visitorMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitorMessage.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentDate);

