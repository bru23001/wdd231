export class BookSearchService {
    constructor(books) {
      this.books = books;
    }
  
    search(query, filters = {}) {
      return this.books.filter(book => {
        const matchesQuery = !query || 
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.description.toLowerCase().includes(query.toLowerCase());
  
        const matchesGenre = !filters.genre || book.genre === filters.genre;
        const matchesPriceRange = (!filters.minPrice || book.price >= filters.minPrice) &&
                                 (!filters.maxPrice || book.price <= filters.maxPrice);
        const matchesRating = !filters.minRating || book.rating >= filters.minRating;
  
        return matchesQuery && matchesGenre && matchesPriceRange && matchesRating;
      });
    }
  
    sortResults(books, sortBy) {
      const sortedBooks = [...books];
      switch(sortBy) {
        case 'price-asc':
          return sortedBooks.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return sortedBooks.sort((a, b) => b.price - a.price);
        case 'rating':
          return sortedBooks.sort((a, b) => b.rating - a.rating);
        default:
          return sortedBooks;
      }
    }
  }