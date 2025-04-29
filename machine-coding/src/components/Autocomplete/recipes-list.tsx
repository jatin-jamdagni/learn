"use client"
import { Recipe } from "@/types/recipe"
import { Star } from "lucide-react"
 import Image from "next/image"
interface RecipeListProps {
  recipes: Recipe[]
  onSelect: (recipe: Recipe) => void
  highlightedIndex: number
  id: string
}

export function RecipeList({ recipes, onSelect, highlightedIndex, id }: RecipeListProps) {
  return (
    <ul
      id={id}
      className="absolute z-10 w-full mt-2 rounded-lg border border-gray-700 bg-gray-800 max-h-80 overflow-y-auto shadow-xl"
      role="listbox"
    >
      {recipes.map((recipe, index) => (
        <li
          key={recipe.id}
          role="option"
          aria-selected={highlightedIndex === index ? "true" : "false"}
          className="border-b border-gray-700 last:border-0"
        >
          <button
            onClick={() => onSelect(recipe)}
            className={`w-full text-left py-3 px-4 transition-color  duration-150 ease-in-out focus:rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
              highlightedIndex === index ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <div className="flex items-start rounded-md gap-3">
              {recipe.image && (
                <div className="flex-shrink-0 h-16 w-16 rounded overflow-hidden bg-gray-700">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt=""
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=64&width=64"
                    }}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{recipe.name}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-xs text-gray-300">{recipe.rating.toFixed(1)}</span>
                  </div>
                  <span className="mx-2 text-gray-500 text-xs">•</span>
                  <span className="text-xs text-gray-300">{recipe.cuisine}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900 text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {recipe.tags.length > 3 && (
                    <span className="text-xs text-gray-400">+{recipe.tags.length - 3} more</span>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-400 whitespace-nowrap">
                {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
