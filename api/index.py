from flask import Flask, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# Book class from our previous implementation
class Book:
    def __init__(self, title, author, isbn="", 
                 genre="", publication_year=None, 
                 status="Available", notes=""):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.genre = genre
        self.publication_year = publication_year
        self.status = status
        self.notes = notes
        self.date_added = datetime.now().strftime("%Y-%m-%d")
        
    def to_dict(self):
        """Convert book object to dictionary for JSON serialization"""
        return {
            "title": self.title,
            "author": self.author,
            "isbn": self.isbn,
            "genre": self.genre,
            "publication_year": self.publication_year,
            "status": self.status,
            "notes": self.notes,
            "date_added": self.date_added
        }
    
    @classmethod
    def from_dict(cls, data):
        """Create a Book object from dictionary data"""
        book = cls(
            title=data["title"],
            author=data["author"],
            isbn=data.get("isbn", ""),
            genre=data.get("genre", ""),
            publication_year=data.get("publication_year"),
            status=data.get("status", "Available"),
            notes=data.get("notes", "")
        )
        book.date_added = data.get("date_added", book.date_added)
        return book

# Library class from our previous implementation
class Library:
    def __init__(self, name="My Library"):
        self.name = name
        self.books = []
        self.file_path = f"{name.lower().replace(' ', '_')}_library.json"
        self.load_from_file()
        
    def add_book(self, book):
        """Add a book to the library"""
        self.books.append(book)
        self.save_to_file()
        return book.to_dict()
        
    def remove_book(self, book_identifier):
        """Remove a book by title or ISBN"""
        for i, book in enumerate(self.books):
            if (book.title.lower() == book_identifier.lower() or 
                book.isbn == book_identifier):
                removed_book = self.books.pop(i)
                self.save_to_file()
                return removed_book.to_dict()
        return None
    
    def search_books(self, query):
        """Search for books by title, author, or genre"""
        query = query.lower()
        results = []
        
        for book in self.books:
            if (query in book.title.lower() or 
                query in book.author.lower() or 
                query in book.genre.lower() or 
                query in book.isbn):
                results.append(book.to_dict())
                
        return results
    
    def list_books(self, sort_by="title"):
        """List all books, optionally sorted by a field"""
        if not self.books:
            return []
        
        if sort_by == "title":
            sorted_books = sorted(self.books, key=lambda x: x.title)
        elif sort_by == "author":
            sorted_books = sorted(self.books, key=lambda x: x.author)
        elif sort_by == "year":
            # Handle None values for publication_year
            sorted_books = sorted(self.books, key=lambda x: (x.publication_year is None, x.publication_year))
        elif sort_by == "date_added":
            sorted_books = sorted(self.books, key=lambda x: x.date_added)
        else:
            sorted_books = self.books
            
        return [book.to_dict() for book in sorted_books]
    
    def get_stats(self):
        """Get statistics about the library"""
        if not self.books:
            return {"total_books": 0}
        
        genres = {}
        statuses = {}
        authors = {}
        years = {}
        
        for book in self.books:
            # Count genres
            if book.genre:
                genres[book.genre] = genres.get(book.genre, 0) + 1
            
            # Count statuses
            statuses[book.status] = statuses.get(book.status, 0) + 1
            
            # Count authors
            authors[book.author] = authors.get(book.author, 0) + 1
            
            # Count publication years
            if book.publication_year:
                years[book.publication_year] = years.get(book.publication_year, 0) + 1
        
        return {
            "total_books": len(self.books),
            "genres": genres,
            "statuses": statuses,
            "authors": authors,
            "years": years,
            "top_genre": max(genres.items(), key=lambda x: x[1])[0] if genres else None,
            "top_author": max(authors.items(), key=lambda x: x[1])[0] if authors else None,
            "readingProgress": {
                "booksReadThisYear": statuses.get("Read", 0),
                "booksReadLastYear": 0,  # Would need date tracking for this
                "currentlyReading": statuses.get("Reading", 0)
            }
        }
    
    def update_book_status(self, book_identifier, new_status):
        """Update the status of a book"""
        for book in self.books:
            if (book.title.lower() == book_identifier.lower() or 
                book.isbn == book_identifier):
                book.status = new_status
                self.save_to_file()
                return book.to_dict()
        return None
    
    def save_to_file(self):
        """Save the library to a JSON file"""
        try:
            with open(self.file_path, 'w') as file:
                books_data = [book.to_dict() for book in self.books]
                library_data = {
                    "name": self.name,
                    "books": books_data
                }
                json.dump(library_data, file, indent=4)
            return True
        except Exception as e:
            print(f"Error saving library: {e}")
            return False
    
    def load_from_file(self):
        """Load the library from a JSON file"""
        if not os.path.exists(self.file_path):
            return False
        
        try:
            with open(self.file_path, 'r') as file:
                data = json.load(file)
                self.name = data.get("name", self.name)
                self.books = [Book.from_dict(book_data) for book_data in data.get("books", [])]
            return True
        except Exception as e:
            print(f"Error loading library: {e}")
            return False

# Create a global library instance
library = Library()

# API Routes
@app.route('/api/books', methods=['GET'])
def get_books():
    sort_by = request.args.get('sort', 'title')
    return jsonify(library.list_books(sort_by))

@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.json
    book = Book(
        title=data.get('title'),
        author=data.get('author'),
        isbn=data.get('isbn', ''),
        genre=data.get('genre', ''),
        publication_year=data.get('publicationYear'),
        status=data.get('status', 'Available'),
        notes=data.get('notes', '')
    )
    result = library.add_book(book)
    return jsonify(result)

@app.route('/api/books/<identifier>', methods=['DELETE'])
def remove_book(identifier):
    result = library.remove_book(identifier)
    if result:
        return jsonify({"success": True, "book": result})
    return jsonify({"success": False, "message": "Book not found"}), 404

@app.route('/api/books/search', methods=['GET'])
def search_books():
    query = request.args.get('q', '')
    return jsonify(library.search_books(query))

@app.route('/api/books/<identifier>/status', methods=['PUT'])
def update_status(identifier):
    data = request.json
    new_status = data.get('status')
    result = library.update_book_status(identifier, new_status)
    if result:
        return jsonify({"success": True, "book": result})
    return jsonify({"success": False, "message": "Book not found"}), 404

@app.route('/api/stats', methods=['GET'])
def get_stats():
    return jsonify(library.get_stats())

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello from the Python Library Manager API!"})

if __name__ == '__main__':
    app.run(port=5328, debug=True)
