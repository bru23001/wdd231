// ===================================================================================
// ============================== FORM HANDLER ======================================
// ===================================================================================
/**
 * This module handles form-related functionality, including the generation of 
 * timestamps and dynamic behavior for form elements on the Chamber website.
 */

document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const membershipLevel = localStorage.getItem("membershipLevel");
    if (membershipLevel) {
        const dropdown = document.getElementById("membershipLevel");
        dropdown.value = membershipLevel; 
    }
});


document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Capture the selected membership level
    const membershipLevel = document.getElementById("membershipLevel").value;

    // Save the membership level to localStorage or use it directly
    localStorage.setItem("membershipLevel", membershipLevel);

    // Redirect to the thank-you page (example)
    window.location.href = "thankyou.html";
});