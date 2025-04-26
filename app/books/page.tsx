import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookPlus, BookOpen, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function BooksPage() {
  // This would be fetched from the API in a real application
  const books = []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Books</h1>
          <p className="text-muted-foreground">Browse and manage your book collection</p>
        </div>
        <div className="flex gap-2">
          <Link href="/search">
            <Button variant="outline" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </Link>
          <Link href="/books/add">
            <Button className="flex items-center gap-2">
              <BookPlus className="h-4 w-4" />
              Add Book
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            Reading
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            Read
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            Wishlist
          </Badge>
        </div>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Book cards would go here */}
        </div>
      ) : (
        <Card className="w-full">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle>Your library is empty</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Start building your collection by adding your first book.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/books/add">
              <Button className="flex items-center gap-2">
                <BookPlus className="h-4 w-4" />
                Add Your First Book
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
