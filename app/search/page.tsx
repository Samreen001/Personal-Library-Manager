"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, SearchIcon } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)

    try {
      // This would call the API to search books in a real application
      console.log("Searching for:", searchQuery)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set empty results for now
      setSearchResults([])
    } catch (error) {
      console.error("Error searching books:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Search Your Library</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Search by title, author, genre, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                "Searching..."
              ) : (
                <>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </form>

        {searchQuery && (
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">
              {searchResults.length === 0
                ? "No results found"
                : `Found ${searchResults.length} results for "${searchQuery}"`}
            </h2>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="space-y-4">{/* Search results would go here */}</div>
        ) : searchQuery ? (
          <Card>
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <CardTitle>No books found</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Try searching with different keywords or add a new book to your library.
              </p>
              <Link href="/books/add">
                <Button>Add New Book</Button>
              </Link>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
