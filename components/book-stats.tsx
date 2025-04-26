import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, BookText, BookMarked } from "lucide-react"

export default function BookStats() {
  // This would be fetched from the API in a real application
  const stats = {
    totalBooks: 0,
    topGenre: "N/A",
    topAuthor: "N/A",
    statuses: {
      Available: 0,
      Reading: 0,
      Read: 0,
      Borrowed: 0,
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Library Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Reading Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Available</span>
              </div>
              <span className="text-sm font-medium">{stats.statuses.Available}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookText className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm">Reading</span>
              </div>
              <span className="text-sm font-medium">{stats.statuses.Reading}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookMarked className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm">Read</span>
              </div>
              <span className="text-sm font-medium">{stats.statuses.Read}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Top Genre</span>
            <span className="text-sm font-medium">{stats.topGenre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Top Author</span>
            <span className="text-sm font-medium">{stats.topAuthor}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
