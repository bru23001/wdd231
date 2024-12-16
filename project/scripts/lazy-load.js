/*====================================================================================
====================================LAZY_LOAD_JS======================================
====================================================================================*/

/** 
 * This script implements lazy loading for images on the Your Book Club website.
 * It uses the Intersection Observer API to load images only when they enter the viewport.
 */

document.addEventListener("DOMContentLoaded", () => {
    //=============================LAZY_LOAD_IMAGES=================================
    const lazyImages = document.querySelectorAll("img.lazy-load");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add("fade-in");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => observer.observe(img));
});