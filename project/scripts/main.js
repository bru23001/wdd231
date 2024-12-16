/*====================================================================================
====================================MAIN_JS===========================================
====================================================================================*/

/*
 * This script handles all core functionality for the Your Book Club website
 * including navigation, form validation, lazy loading, and local storage.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Error boundary for initialization
    try {
        initializeApp();
    } catch (error) {
        console.error('Initialization failed:', error);
        showErrorMessage('An error occurred while initializing the application');
    }
});

// Initialize all app functionality

function initializeApp() {
    setupNavigation();
    setupForms();
    setupLazyLoading();
    setupModalHandling();
    updateFooter();
    initializeFavorites();
}


// Setup navigation functionality

function setupNavigation() {
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector(".nav-links");

    if (hamButton && navigation) {
        hamButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            hamButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
        });
    }
}

/**
 * Set loading state for elements
 * @param {HTMLElement} element - Element to set loading state
 * @param {boolean} isLoading - Loading state
 */
function setLoadingState(element, isLoading) {
    if (!element) return;
    
    element.classList.toggle('loading', isLoading);
    element.disabled = isLoading;
}

/**
 * Show error message to user
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.setAttribute('role', 'alert');
    errorContainer.textContent = message;
    
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(errorContainer, main.firstChild);
        setTimeout(() => errorContainer.remove(), 5000);
    }
}

// Setup form handling

function setupForms() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const errorMessage = form.querySelector('.error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            await handleFormSubmission(form, emailInput, submitButton);
        } catch (error) {
            console.error('Form submission failed:', error);
            showError(errorMessage, 'Form submission failed. Please try again.');
        }
    });
}

/**
 * Handle form submission
 * @param {HTMLFormElement} form - Form element
 * @param {HTMLInputElement} emailInput - Email input element
 * @param {HTMLButtonElement} submitButton - Submit button element
 */
async function handleFormSubmission(form, emailInput, submitButton) {
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
        throw new Error('Invalid email address');
    }

    setLoadingState(submitButton, true);

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store in localStorage
        saveToLocalStorage('newsletter_signup', { email, date: new Date().toISOString() });
        
        form.reset();
        showSuccessMessage('Thank you for subscribing!');
    } finally {
        setLoadingState(submitButton, false);
    }
}

// Setup modal handling

function setupModalHandling() {
    const modal = document.getElementById('book-modal');
    if (!modal) return;

    // Close modal handlers
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => modal.close());
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });

    // Add to cart handler
    const addToCartButton = modal.querySelector('#add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', handleAddToCart);
    }
}

/**
 * Show book details in modal
 * @param {Object} book - Book data
 */
function showBookDetails(book) {
    const modal = document.getElementById('book-modal');
    if (!modal) return;

    // Update modal content
    modal.querySelector('#modal-title').textContent = book.title;
    modal.querySelector('#modal-image').src = book.coverImage;
    modal.querySelector('#modal-image').alt = `${book.title} cover`;
    modal.querySelector('#modal-author').textContent = `By ${book.author}`;
    modal.querySelector('#modal-rating').style.width = `${book.rating * 20}%`;
    modal.querySelector('#modal-genre').textContent = book.genre;
    modal.querySelector('#modal-price').textContent = `$${book.price.toFixed(2)}`;
    modal.querySelector('#modal-description').textContent = book.description;
    modal.querySelector('#modal-isbn').textContent = `ISBN: ${book.isbn}`;
    modal.querySelector('#modal-pages').textContent = `Pages: ${book.pageCount}`;

    modal.showModal();
}

/**
 * Handle adding book to cart
 * @param {Event} e - Click event
 */
function handleAddToCart(e) {
    e.preventDefault();
    const modal = document.getElementById('book-modal');
    const bookTitle = modal.querySelector('#modal-title').textContent;
    
    // Get existing cart or initialize new one
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
        title: bookTitle,
        dateAdded: new Date().toISOString()
    });
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    showSuccessMessage('Book added to cart!');
}

// Setup lazy loading for images

function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize favorites functionality
function initializeFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    document.querySelectorAll('.favorite-button').forEach(button => {
        const bookId = button.dataset.bookId;
        button.classList.toggle('active', favorites.includes(bookId));
        
        button.addEventListener('click', () => toggleFavorite(bookId));
    });
}

/**
 * Toggle favorite status of a book
 * @param {string} bookId - Book identifier
 */
function toggleFavorite(bookId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(bookId);
    
    if (index === -1) {
        favorites.push(bookId);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

// Update footer content
function updateFooter() {
    const currentYearSpan = document.getElementById("current-year");
    const lastModifiedSpan = document.getElementById("last-modified");
    
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is email valid
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/** 
* Show success message
* @param {string} message - Success message to display
*/ 
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.setAttribute('role', 'alert');
    successMessage.textContent = message;
    
    document.body.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
}

// Update favorite buttons state
function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    document.querySelectorAll('.favorite-button').forEach(button => {
        const bookId = button.dataset.bookId;
        button.classList.toggle('active', favorites.includes(bookId));
    });
}

//=============================FOOTER_UPDATES===============================

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("current-year").textContent = new Date().getFullYear();


    document.getElementById("last-modified").textContent = document.lastModified;
});

class ErrorBoundary {
    static handleError(error, errorInfo) {
      // Log to error tracking service
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
  
      // Show user-friendly error message
      const errorContainer = document.createElement('div');
      errorContainer.className = 'error-message';
      errorContainer.textContent = 'Something went wrong. Please try again later.';
      document.body.appendChild(errorContainer);
    }
  }