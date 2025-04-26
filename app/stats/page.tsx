import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, BookOpen, BookText, BookMarked, Users, BookType } from "lucide-react"

export default function StatsPage() {
  // This would be fetched from the API in a real application
  const stats = {
    totalBooks: 0,
    topGenres: [],
    topAuthors: [],
    statuses: {
      Available: 0,
      Reading: 0,
      Read: 0,
      Borrowed: 0,
      Wishlist: 0,
    },
    readingProgress: {
      booksReadThisYear: 0,
      booksReadLastYear: 0,
      currentlyReading: 0,
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Library Statistics</h1>
        <p className="text-muted-foreground">Insights and analytics about your book collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              <span className="text-2xl font-bold">{stats.totalBooks}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Currently Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookText className="h-5 w-5 mr-2 text-blue-500" />
              <span className="text-2xl font-bold">{stats.readingProgress.currentlyReading}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Books Read This Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookMarked className="h-5 w-5 mr-2 text-green-500" />
              <span className="text-2xl font-bold">{stats.readingProgress.booksReadThisYear}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Authors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-500" />
              <span className="text-2xl font-bold">{stats.topAuthors.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Reading Status</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(stats.statuses).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(stats.statuses).map(([status, count]) => (
                  <div key={status} className="flex items-center">
                    <div className="w-1/4 text-sm">{status}</div>
                    <div className="w-3/4 flex items-center">
                      <div
                        className="h-3 bg-primary rounded-full"
                        style={{
                          width: `${count > 0 ? (count / Math.max(...Object.values(stats.statuses))) * 100 : 0}%`,
                          minWidth: count > 0 ? "20px" : "0",
                        }}
                      />
                      <span className="ml-2 text-sm">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Add books to your library to see reading status statistics.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Genres</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.topGenres.length > 0 ? (
              <div className="space-y-2">
                {stats.topGenres.map((genre, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookType className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">Genre Name</span>
                    </div>
                    <Badge variant="outline">0</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookType className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Add books with genres to see this statistic.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
