// ===================================================================================
// =========================== DARK MODE TOGGLE =====================================
// ===================================================================================
/**
 * This module handles the dark mode toggle functionality on the Chamber website, 
 * allowing users to switch between light and dark themes.
 */

const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Set current year and last modified date in footer
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

