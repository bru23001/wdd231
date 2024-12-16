// Visit tracking utilities
function getDaysBetween(date1, date2) {
    return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
}

function updateVisitorMessage() {
    const visitorMessage = document.getElementById("visitorMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();

    if (!visitorMessage) return;

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
}

// Form data storage
function saveFormData(formData) {
    try {
        localStorage.setItem('formData', JSON.stringify(formData));
        return true;
    } catch (error) {
        console.error('Error saving form data:', error);
        return false;
    }
}

function getFormData() {
    try {
        const data = localStorage.getItem('formData');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error retrieving form data:', error);
        return null;
    }
}

// User preferences
function saveUserPreferences(preferences) {
    try {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        return true;
    } catch (error) {
        console.error('Error saving preferences:', error);
        return false;
    }
}

function getUserPreferences() {
    try {
        const prefs = localStorage.getItem('userPreferences');
        return prefs ? JSON.parse(prefs) : {
            theme: 'light',
            viewMode: 'grid'
        };
    } catch (error) {
        console.error('Error retrieving preferences:', error);
        return {
            theme: 'light',
            viewMode: 'grid'
        };
    }
}

// Thank you page data display
function displayFormData() {
    const formData = getFormData();
    if (!formData) return;

    const fields = ['firstName', 'lastName', 'email', 'mobilePhone', 'organization', 'timestamp'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element && formData[field]) {
            element.textContent = formData[field];
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateVisitorMessage();
    
    // Set timestamp if on join form
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // Display form data if on thank you page
    if (window.location.pathname.includes('thankyou.html')) {
        displayFormData();
    }

    // Apply user preferences
    const preferences = getUserPreferences();
    document.body.classList.toggle('dark-mode', preferences.theme === 'dark');
    if (document.querySelector('.business-cards')) {
        document.querySelector('.business-cards').classList.toggle('grid-view', preferences.viewMode === 'grid');
    }
});

export {
    updateVisitorMessage,
    saveFormData,
    getFormData,
    saveUserPreferences,
    getUserPreferences
};