"use client"
import type React from "react"
import { useState, useEffect } from "react"
  
import { SearchIcon, Loader2 } from "lucide-react"
import { RecipeList } from "./recipes-list"
import { Recipe } from "@/types/recipe"
import { useClickOutside } from "@/hooks/use-click-outside"
import { useDebounce } from "@/hooks/use-debounce"

export function SearchRecipes() {
  const [query, setQuery] = useState<string>("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

  const debouncedSearch = useDebounce(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setRecipes([])
      setIsOpen(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setRecipes(data.recipes || [])
      setIsOpen(data.recipes && data.recipes.length > 0)
    } catch (err) {
      console.error("Failed to fetch recipes:", err)
      setError("Failed to fetch recipes. Please try again.")
      setRecipes([])
    } finally {
      setIsLoading(false)
    }
  }, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  const handleSelectRecipe = (recipe: Recipe) => {
    setQuery(recipe.name)
    setIsOpen(false)
    // You could add navigation to recipe details here
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && e.key === "ArrowDown" && recipes.length > 0) {
      e.preventDefault()
      setIsOpen(true)
      setHighlightedIndex(0)
      return
    }

    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prevIndex) => (prevIndex < recipes.length - 1 ? prevIndex + 1 : prevIndex))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex !== -1 && recipes[highlightedIndex]) {
          handleSelectRecipe(recipes[highlightedIndex])
        }
        break
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        break
      default:
        break
    }
  }

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [recipes])

  return (
    <div className="w-full max-w-md relative" ref={ref}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => recipes.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="recipe-list"
          role="combobox"
          className="w-full py-3 pl-10 pr-5 rounded-lg border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-lg"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-4   text-blue-500 h-5 w-5 animate-spin" />
        )}
      </div>

      {isOpen && (
        <RecipeList
          recipes={recipes}
          onSelect={handleSelectRecipe}
          highlightedIndex={highlightedIndex}
          id="recipe-list"
        />
      )}

      {error && <div className="mt-2 text-red-400 text-sm">{error}</div>}

      {query && !isLoading && recipes.length === 0 && !error && (
        <div className="mt-2 text-gray-400 text-sm">No recipes found. Try a different search term.</div>
      )}
    </div>
  )
}
