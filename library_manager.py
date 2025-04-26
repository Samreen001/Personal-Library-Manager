import json
import os
from datetime import datetime
from typing import Dict, List, Optional, Union

class Book:
    def __init__(self, title: str, author: str, isbn: str = "", 
                 genre: str = "", publication_year: int = None, 
                 status: str = "Available", notes: str = ""):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.genre = genre
        self.publication_year = publication_year
        self.status = status  # Available, Borrowed, Read, etc.
        self.notes = notes
        self.date_added = datetime.now().strftime("%Y-%m-%d")
        
    def to_dict(self) -> Dict:
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
    def from_dict(cls, data: Dict) -> 'Book':
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
    
    def __str__(self) -> str:
        """String representation of the book"""
        return f"{self.title} by {self.author} ({self.publication_year or 'Unknown'})"


class Library:
    def __init__(self, name: str = "My Library"):
        self.name = name
        self.books: List[Book] = []
        self.file_path = f"{name.lower().replace(' ', '_')}_library.json"
        
    def add_book(self, book: Book) -> None:
        """Add a book to the library"""
        self.books.append(book)
        print(f"Added: {book}")
        
    def remove_book(self, book_identifier: str) -> bool:
        """Remove a book by title or ISBN"""
        for i, book in enumerate(self.books):
            if (book.title.lower() == book_identifier.lower() or 
                book.isbn == book_identifier):
                removed_book = self.books.pop(i)
                print(f"Removed: {removed_book}")
                return True
        print(f"Book '{book_identifier}' not found in library.")
        return False
    
    def search_books(self, query: str) -> List[Book]:
        """Search for books by title, author, or genre"""
        query = query.lower()
        results = []
        
        for book in self.books:
            if (query in book.title.lower() or 
                query in book.author.lower() or 
                query in book.genre.lower() or 
                query in book.isbn):
                results.append(book)
                
        return results
    
    def list_books(self, sort_by: str = "title") -> List[Book]:
        """List all books, optionally sorted by a field"""
        if not self.books:
            print("Library is empty.")
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
            
        return sorted_books
    
    def get_stats(self) -> Dict:
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
            "top_author": max(authors.items(), key=lambda x: x[1])[0] if authors else None
        }
    
    def update_book_status(self, book_identifier: str, new_status: str) -> bool:
        """Update the status of a book"""
        for book in self.books:
            if (book.title.lower() == book_identifier.lower() or 
                book.isbn == book_identifier):
                book.status = new_status
                print(f"Updated status of '{book.title}' to '{new_status}'")
                return True
        print(f"Book '{book_identifier}' not found in library.")
        return False
    
    def save_to_file(self) -> bool:
        """Save the library to a JSON file"""
        try:
            with open(self.file_path, 'w') as file:
                books_data = [book.to_dict() for book in self.books]
                library_data = {
                    "name": self.name,
                    "books": books_data
                }
                json.dump(library_data, file, indent=4)
            print(f"Library saved to {self.file_path}")
            return True
        except Exception as e:
            print(f"Error saving library: {e}")
            return False
    
    def load_from_file(self) -> bool:
        """Load the library from a JSON file"""
        if not os.path.exists(self.file_path):
            print(f"No library file found at {self.file_path}")
            return False
        
        try:
            with open(self.file_path, 'r') as file:
                data = json.load(file)
                self.name = data.get("name", self.name)
                self.books = [Book.from_dict(book_data) for book_data in data.get("books", [])]
            print(f"Loaded {len(self.books)} books from {self.file_path}")
            return True
        except Exception as e:
            print(f"Error loading library: {e}")
            return False


def display_books(books: List[Book]) -> None:
    """Display a list of books in a formatted table"""
    if not books:
        print("No books to display.")
        return
    
    # Print header
    print("\n{:<40} {:<25} {:<10} {:<15} {:<10}".format(
        "Title", "Author", "Year", "Genre", "Status"))
    print("-" * 100)
    
    # Print each book
    for book in books:
        print("{:<40} {:<25} {:<10} {:<15} {:<10}".format(
            book.title[:37] + "..." if len(book.title) > 37 else book.title,
            book.author[:22] + "..." if len(book.author) > 22 else book.author,
            book.publication_year or "Unknown",
            book.genre[:12] + "..." if len(book.genre) > 12 else book.genre,
            book.status
        ))


def main():
    """Main function to run the library manager"""
    print("\n===== Personal Library Manager =====\n")
    
    library_name = input("Enter your library name (or press Enter for 'My Library'): ")
    library = Library(library_name if library_name else "My Library")
    
    # Try to load existing library
    library.load_from_file()
    
    while True:
        print("\n===== Library Menu =====")
        print("1. Add a book")
        print("2. Remove a book")
        print("3. Search for books")
        print("4. List all books")
        print("5. View library statistics")
        print("6. Update book status")
        print("7. Save library")
        print("8. Exit")
        
        choice = input("\nEnter your choice (1-8): ")
        
        if choice == '1':
            # Add a book
            title = input("Enter book title: ")
            author = input("Enter author name: ")
            isbn = input("Enter ISBN (optional): ")
            genre = input("Enter genre (optional): ")
            
            year_input = input("Enter publication year (optional): ")
            publication_year = int(year_input) if year_input.isdigit() else None
            
            status = input("Enter status (Available, Borrowed, Read) or press Enter for 'Available': ")
            if not status:
                status = "Available"
                
            notes = input("Enter any notes (optional): ")
            
            new_book = Book(title, author, isbn, genre, publication_year, status, notes)
            library.add_book(new_book)
            
        elif choice == '2':
            # Remove a book
            identifier = input("Enter the title or ISBN of the book to remove: ")
            library.remove_book(identifier)
            
        elif choice == '3':
            # Search for books
            query = input("Enter search term (title, author, genre, or ISBN): ")
            results = library.search_books(query)
            print(f"\nFound {len(results)} books matching '{query}':")
            display_books(results)
            
        elif choice == '4':
            # List all books
            print("\nSort by:")
            print("1. Title")
            print("2. Author")
            print("3. Publication Year")
            print("4. Date Added")
            
            sort_choice = input("Enter your choice (1-4) or press Enter for Title: ")
            
            sort_options = {
                '1': 'title',
                '2': 'author',
                '3': 'year',
                '4': 'date_added'
            }
            
            sort_by = sort_options.get(sort_choice, 'title')
            books = library.list_books(sort_by)
            
            print(f"\nListing all books sorted by {sort_by}:")
            display_books(books)
            
        elif choice == '5':
            # View library statistics
            stats = library.get_stats()
            print("\n===== Library Statistics =====")
            print(f"Total books: {stats['total_books']}")
            
            if stats['total_books'] > 0:
                print(f"Top genre: {stats.get('top_genre', 'N/A')}")
                print(f"Top author: {stats.get('top_author', 'N/A')}")
                
                print("\nBooks by status:")
                for status, count in stats.get('statuses', {}).items():
                    print(f"  {status}: {count}")
                
                print("\nBooks by genre:")
                for genre, count in sorted(stats.get('genres', {}).items(), key=lambda x: x[1], reverse=True)[:5]:
                    print(f"  {genre}: {count}")
                
                print("\nBooks by author:")
                for author, count in sorted(stats.get('authors', {}).items(), key=lambda x: x[1], reverse=True)[:5]:
                    print(f"  {author}: {count}")
            
        elif choice == '6':
            # Update book status
            identifier = input("Enter the title or ISBN of the book to update: ")
            print("Available statuses: Available, Borrowed, Reading, Read, Wishlist")
            new_status = input("Enter new status: ")
            library.update_book_status(identifier, new_status)
            
        elif choice == '7':
            # Save library
            library.save_to_file()
            
        elif choice == '8':
            # Exit
            save_choice = input("Save library before exiting? (y/n): ")
            if save_choice.lower() == 'y':
                library.save_to_file()
            print("Thank you for using Personal Library Manager!")
            break
            
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
