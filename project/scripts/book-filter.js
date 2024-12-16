/*====================================================================================
====================================BOOK_FILTER_JS====================================
====================================================================================*/


//This script provides search functionality for books on the Your Book Club website.


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const books = document.querySelectorAll(".book-item");
    const noResultsMessage = document.getElementById("no-results");

    //=============================SEARCH_FUNCTIONALITY=============================
    searchInput.addEventListener("keyup", () => {
        const filter = searchInput.value.toLowerCase();
        let matchesFound = false;

        books.forEach((book) => {
            const title = book.querySelector(".book-title").textContent.toLowerCase();
            const author = book.querySelector(".book-author").textContent.toLowerCase();
            const genre = book.querySelector(".book-genre").textContent.toLowerCase();

            if (title.includes(filter) || author.includes(filter) || genre.includes(filter)) {
                book.style.display = "block";
                matchesFound = true;
            } else {
                book.style.display = "none";
            }
        });

        // Show/hide no results message
        noResultsMessage.style.display = matchesFound ? "none" : "block";
    });
});