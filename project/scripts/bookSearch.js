import { BookSearchService } from './searchService.js';
import { books } from './books.js';

const searchService = new BookSearchService(books);
let currentSearchResults = [];

async function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value;
  const filters = {
    genre: document.getElementById('genre-filter').value,
    minPrice: parseFloat(document.getElementById('min-price').value) || 0,
    maxPrice: parseFloat(document.getElementById('max-price').value) || Infinity,
    minRating: parseFloat(document.getElementById('min-rating').value) || 0
  };
  const sortBy = document.getElementById('sort-by').value;

  try {
    currentSearchResults = searchService.search(query, filters);
    currentSearchResults = searchService.sortResults(currentSearchResults, sortBy);
    displayResults(currentSearchResults);
    updateSearchStats(currentSearchResults.length);
    // Save search to localStorage
    saveSearch(query, filters);
  } catch (error) {
    showErrorMessage('Search failed. Please try again.');
  }
}

function displayResults(results) {
  const container = document.querySelector('.content-grid');
  if (results.length === 0) {
    container.innerHTML = '<div class="no-results">No books found matching your criteria.</div>';
    return;
  }
  
  container.innerHTML = results.map(book => `
    <div class="book-card" data-id="${book.id}">
      <img src="${book.coverImage}" alt="${book.title}" loading="lazy">
      <div class="book-content">
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <div class="star-rating">
          <span style="width: ${book.rating * 20}%"></span>
        </div>
        <p class="genre">${book.genre}</p>
        <p class="price">$${book.price.toFixed(2)}</p>
        <button class="cta-button-1" onclick="showBookDetails(${book.id})">View Details</button>
      </div>
    </div>
  `).join('');
}

function saveSearch(query, filters) {
  localStorage.setItem('lastSearch', JSON.stringify({
    query,
    filters,
    timestamp: new Date().toISOString()
  }));
}

function showErrorMessage(message) {
  const stats = document.getElementById('search-stats');
  stats.innerHTML = `<div class="error-message">${message}</div>`;
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-form').addEventListener('submit', handleSearch);
  document.querySelectorAll('.filter-control').forEach(control => {
    control.addEventListener('change', handleSearch);
  });

  // Load last search
  const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
  if (lastSearch) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = lastSearch.query;
    handleSearch(new Event('submit'));
  }
});

export { handleSearch, displayResults, showErrorMessage };