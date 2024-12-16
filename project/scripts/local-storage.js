/*====================================================================================
====================================LOCAL_STORAGE_JS==================================
====================================================================================*/

/** 
 * This script manages favorite books using local storage for the Your Book Club website.
 */

// Retrieve favorite books from local storage or initialize an empty array
const favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || [];

//=============================ADD_FAVORITE========================================
/**
 * Adds a book to favorites
 * @param {string} bookId - The ID of the book to add
 */
function addFavorite(bookId) {
    if (!favoriteBooks.includes(bookId)) {
        favoriteBooks.push(bookId);
        localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
        alert("Book added to favorites!");
        updateFavorites();
    } else {
        alert("This book is already in your favorites.");
    }
}

//=============================UPDATE_FAVORITES====================================

// Updates the favorites section in the DOM

function updateFavorites() {
    const favoriteSection = document.getElementById("favorites-section");
    favoriteSection.innerHTML = "";
    favoriteBooks.forEach((bookId) => {
        const book = document.getElementById(bookId);
        if (book) {
            favoriteSection.appendChild(book.cloneNode(true));
        }
    });
}

// Load favorites on page load
document.addEventListener("DOMContentLoaded", updateFavorites);