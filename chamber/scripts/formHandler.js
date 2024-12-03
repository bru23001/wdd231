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