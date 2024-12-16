/*====================================================================================
====================================CAROUSEL_JS=======================================
====================================================================================*/


//This script implements a book carousel feature for the Your Book Club website.


document.addEventListener("DOMContentLoaded", () => {
  // Select elements needed for carousel functionality
  const books = document.querySelectorAll(".carousel-book");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  let currentIndex = 0; // Initialize the starting book index

  //=============================SHOW_BOOK========================================
  /**
   * Updates the visible book in the carousel
   * @param {number} index - The index of the book to show
   */
  function showBook(index) {
      books.forEach((book, i) => {
          // Toggle the "active" class to show/hide books
          book.classList.toggle("active", i === index);
      });
  }

  //=============================PREVIOUS_BUTTON==================================
  prevButton.addEventListener("click", () => {
      // Calculate new index previous book, wrapping around if needed
      currentIndex = (currentIndex - 1 + books.length) % books.length;
      showBook(currentIndex);
  });

  //=============================NEXT_BUTTON=====================================
  nextButton.addEventListener("click", () => {
      // Calculate new index next book, wrapping around if needed
      currentIndex = (currentIndex + 1) % books.length;
      showBook(currentIndex);
  });

  // Automatically show the first book on page load
  showBook(currentIndex);

  //=============================AUTO_SLIDE=======================================
  // Auto-slide functionality
  let autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % books.length;
      showBook(currentIndex);
  }, 5000); // Adjust the interval as needed

  //=============================PAUSE_AUTO_SLIDE=================================
  // Pause auto-slide on hover over carousel
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseover", () => {
      clearInterval(autoSlide);
  });

  //=============================RESUME_AUTO_SLIDE================================
  // Resume auto-slide when the mouse leaves the carousel area
  carousel.addEventListener("mouseleave", () => {
      autoSlide = setInterval(() => {
          currentIndex = (currentIndex + 1) % books.length;
          showBook(currentIndex);
      }, 5000);
  });
});