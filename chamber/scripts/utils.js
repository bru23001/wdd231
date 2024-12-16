// Date formatting
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}


//date formatting
function renderCalendar() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = date.getDate();

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Set header
    document.querySelector('.calendar-header').textContent = `${months[month]} ${year}`;

    // Set weekdays
    const weekdaysHTML = weekdays.map(day => `<div>${day}</div>`).join('');
    document.querySelector('.weekdays').innerHTML = weekdaysHTML;

    // Set days
    let daysHTML = '';
    for (let i = 0; i < firstDay; i++) {
        daysHTML += '<div></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today ? 'today' : '';
        daysHTML += `<div class="${isToday}">${day}</div>`;
    }

    document.querySelector('.days').innerHTML = daysHTML;
}

document.addEventListener('DOMContentLoaded', renderCalendar);

// Helper function to capitalize weather description
function capitalizeWords(str) {
    return str.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

function slugify(text) {
    return text.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

// Common DOM selectors
const domElements = {
    header: document.querySelector('header'),
    nav: document.querySelector('nav'),
    footer: document.querySelector('footer'),
    main: document.querySelector('main'),
    menuToggle: document.querySelector('.menu-toggle'),
    darkModeToggle: document.querySelector('.dark-mode-toggle'),
    // Weather elements
    currentTemp: document.getElementById('current-temp'),
    currentDesc: document.getElementById('current-desc'),
    iconDesc: document.getElementById('icon-desc'),
    weatherIcon: document.querySelector('.weather-icon img'),
    weatherForecast: document.getElementById('weather-forecast'),
    // Form elements
    membershipForm: document.querySelector('.membership-form'),
    membershipCards: document.querySelector('.membership-cards'),
    businessCards: document.querySelector('.business-cards')
};

// Error handling
function displayError(element, message, type = 'error') {
    const errorDiv = document.createElement('div');
    errorDiv.className = `alert alert-${type}`;
    errorDiv.textContent = message;
    element.parentNode.insertBefore(errorDiv, element.nextSibling);

    setTimeout(() => errorDiv.remove(), 5000);
}

function displayError() {
    currentTemp.textContent = "N/A";
    currentDesc.textContent = "Weather data unavailable";
    weatherIcon.src = "";
    weatherIcon.alt = "Weather data unavailable";
    iconDesc.textContent = "Error loading weather data";
    weatherForecast.innerHTML = "<p>Forecast unavailable</p>";
}


// Local Storage helpers
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function getLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return null;
    }
}

// Event helper
function addEventListeners(elements, event, handler) {
    elements.forEach(element => element.addEventListener(event, handler));
}

// Export utilities
export {
    formatDate,
    renderCalendar,
    capitalizeWords,
    formatPhoneNumber,
    slugify,
    domElements,
    displayError,
    displayWeatherError,
    setLocalStorage,
    getLocalStorage,
    addEventListeners
};


/* //Common DOM selectors
const currentTemp = document.getElementById("current-temp");
const currentDesc = document.getElementById("current-desc");
const iconDesc = document.getElementById("icon-desc");
const weatherIcon = document.querySelector(".weather-icon img");
const weatherForecast = document.getElementById("weather-forecast");
 */

//Error handling

