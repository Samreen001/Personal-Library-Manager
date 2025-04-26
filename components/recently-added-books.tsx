import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpenCheck } from "lucide-react"

export default function RecentlyAddedBooks() {
  // This would be fetched from the API in a real application
  const recentBooks = []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recently Added Books</CardTitle>
      </CardHeader>
      <CardContent>
        {recentBooks.length > 0 ? (
          <div className="space-y-4">
            {recentBooks.map((book, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 rounded-lg border">
                <div className="h-12 w-12 flex items-center justify-center rounded-md bg-primary/10">
                  <BookOpenCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Book Title</h3>
                  <p className="text-sm text-muted-foreground">Author Name</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Fiction</Badge>
                    <Badge variant="outline">2023</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpenCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No books yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Start building your library by adding your first book.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
