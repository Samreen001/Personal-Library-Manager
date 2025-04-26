import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, BookPlus, BarChart3, Search } from "lucide-react"
import BookStats from "@/components/book-stats"
import RecentlyAddedBooks from "@/components/recently-added-books"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Personal Library Manager</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Manage your book collection, track reading progress, and discover insights about your reading habits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              My Library
            </CardTitle>
            <CardDescription>Browse your book collection</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Total Books</p>
          </CardContent>
          <CardFooter>
            <Link href="/books" className="w-full">
              <Button variant="outline" className="w-full">
                View All Books
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BookPlus className="mr-2 h-5 w-5" />
              Add Book
            </CardTitle>
            <CardDescription>Add a new book to your library</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Quickly add books with title, author, and other details</p>
          </CardContent>
          <CardFooter>
            <Link href="/books/add" className="w-full">
              <Button className="w-full">Add New Book</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Search
            </CardTitle>
            <CardDescription>Find books in your collection</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Search by title, author, genre, or ISBN</p>
          </CardContent>
          <CardFooter>
            <Link href="/search" className="w-full">
              <Button variant="outline" className="w-full">
                Search Books
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Statistics
            </CardTitle>
            <CardDescription>Insights about your collection</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">View reading stats and collection analytics</p>
          </CardContent>
          <CardFooter>
            <Link href="/stats" className="w-full">
              <Button variant="outline" className="w-full">
                View Stats
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentlyAddedBooks />
        </div>
        <div>
          <BookStats />
        </div>
      </div>
    </main>
  )
}
