const booksData = {
    "books": [
        {
            "id": 1,
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "genre": "Classic Fiction",
            "rating": 4.9,
            "price": 12.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A gripping and heart-wrenching tale of racial injustice in the Deep South.",
            "publicationDate": "1960-07-11",
            "isbn": "9780061120084",
            "pageCount": 324,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "classic",
                "racial injustice",
                "American literature"
            ]
        },
        {
            "id": 2,
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Classic Fiction",
            "rating": 4.7,
            "price": 10.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A novel of the Jazz Age, love, wealth, and the American dream.",
            "publicationDate": "1925-04-10",
            "isbn": "9780743273565",
            "pageCount": 180,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "classic",
                "American dream",
                "literature"
            ]
        },
        {
            "id": 3,
            "title": "1984",
            "author": "George Orwell",
            "genre": "Dystopian Fiction",
            "rating": 4.8,
            "price": 14.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A chilling depiction of a totalitarian regime and the loss of individual freedoms.",
            "publicationDate": "1949-06-08",
            "isbn": "9780451524935",
            "pageCount": 328,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "dystopian",
                "totalitarianism",
                "political fiction"
            ]
        },
        {
            "id": 4,
            "title": "Pride and Prejudice",
            "author": "Jane Austen",
            "genre": "Classic Romance",
            "rating": 4.9,
            "price": 11.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A timeless tale of love, class, and social expectations in Regency England.",
            "publicationDate": "1813-01-28",
            "isbn": "9780141040349",
            "pageCount": 279,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "romance",
                "classic",
                "social commentary"
            ]
        },
        {
            "id": 5,
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "genre": "Fantasy",
            "rating": 4.8,
            "price": 14.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A fantastical adventure of Bilbo Baggins in Middle-earth.",
            "publicationDate": "1937-09-21",
            "isbn": "9780547928227",
            "pageCount": 310,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "fantasy",
                "adventure",
                "Middle-earth"
            ]
        },
        {
            "id": 6,
            "title": "Becoming",
            "author": "Michelle Obama",
            "genre": "Memoir",
            "rating": 4.9,
            "price": 16.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "The inspiring memoir of former First Lady Michelle Obama.",
            "publicationDate": "2018-11-13",
            "isbn": "9781524763138",
            "pageCount": 448,
            "format": "Hardcover",
            "inStock": true,
            "tags": [
                "memoir",
                "inspiration",
                "political figures"
            ]
        },
        {
            "id": 7,
            "title": "The Catcher in the Rye",
            "author": "J.D. Salinger",
            "genre": "Coming-of-Age Fiction",
            "rating": 4.5,
            "price": 9.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A journey of teenage rebellion and self-discovery in post-war America.",
            "publicationDate": "1951-07-16",
            "isbn": "9780316769488",
            "pageCount": 214,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "coming-of-age",
                "classic",
                "rebellion"
            ]
        },
        {
            "id": 8,
            "title": "Sapiens: A Brief History of Humankind",
            "author": "Yuval Noah Harari",
            "genre": "Non-Fiction",
            "rating": 4.7,
            "price": 18.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A groundbreaking exploration of human history and evolution.",
            "publicationDate": "2011-02-04",
            "isbn": "9780062316097",
            "pageCount": 464,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "history",
                "evolution",
                "non-fiction"
            ]
        },
        {
            "id": 9,
            "title": "The Alchemist",
            "author": "Paulo Coelho",
            "genre": "Philosophical Fiction",
            "rating": 4.6,
            "price": 13.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A mystical story about following one's dreams and personal legend.",
            "publicationDate": "1988-04-15",
            "isbn": "9780061122415",
            "pageCount": 208,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "philosophy",
                "dreams",
                "inspiration"
            ]
        },
        {
            "id": 10,
            "title": "Educated",
            "author": "Tara Westover",
            "genre": "Memoir",
            "rating": 4.8,
            "price": 14.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A remarkable journey from isolation to education and self-discovery.",
            "publicationDate": "2018-02-20",
            "isbn": "9780399590504",
            "pageCount": 352,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "memoir",
                "education",
                "inspiration"
            ]
        },
        {
            "id": 11,
            "title": "Brave New World",
            "author": "Aldous Huxley",
            "genre": "Dystopian Fiction",
            "rating": 4.6,
            "price": 13.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A futuristic vision of a society controlled by technology and genetic engineering.",
            "publicationDate": "1932-08-01",
            "isbn": "9780060850524",
            "pageCount": 268,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "dystopian",
                "science fiction",
                "classic"
            ]
        },
        {
            "id": 12,
            "title": "Little Women",
            "author": "Louisa May Alcott",
            "genre": "Classic Fiction",
            "rating": 4.8,
            "price": 11.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A heartwarming tale of four sisters growing up during the Civil War era.",
            "publicationDate": "1868-09-30",
            "isbn": "9780147514011",
            "pageCount": 759,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "classic",
                "family",
                "historical fiction"
            ]
        },
        {
            "id": 13,
            "title": "The Road",
            "author": "Cormac McCarthy",
            "genre": "Post-Apocalyptic Fiction",
            "rating": 4.7,
            "price": 14.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A harrowing tale of survival in a bleak, post-apocalyptic world.",
            "publicationDate": "2006-09-26",
            "isbn": "9780307387899",
            "pageCount": 287,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "post-apocalyptic",
                "survival",
                "Pulitzer Prize"
            ]
        },
        {
            "id": 14,
            "title": "The Night Circus",
            "author": "Erin Morgenstern",
            "genre": "Fantasy",
            "rating": 4.6,
            "price": 16.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A mesmerizing tale of a magical circus and the rival magicians tied to its fate.",
            "publicationDate": "2011-09-13",
            "isbn": "9780307744432",
            "pageCount": 387,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "fantasy",
                "magic",
                "romance"
            ]
        },
        {
            "id": 15,
            "title": "Circe",
            "author": "Madeline Miller",
            "genre": "Mythological Fiction",
            "rating": 4.8,
            "price": 15.99,
            "coverImage": "images/monthly-pick800x1200.webp",
            "description": "A reimagining of the life of Circe, the sorceress of Greek mythology.",
            "publicationDate": "2018-04-10",
            "isbn": "9780316556347",
            "pageCount": 400,
            "format": "Paperback",
            "inStock": true,
            "tags": [
                "mythology",
                "Greek myths",
                "fantasy"
            ]
        }
    ]
};


export const books = booksData.books;