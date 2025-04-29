export interface Recipe {
    id: number
    userId: number
    name: string
    image: string
    cuisine: string
    mealType: string[]
    tags: string[]
    difficulty: string
    prepTimeMinutes: number
    cookTimeMinutes: number
    servings: number
    caloriesPerServing: number
    rating: number
    reviewCount: number
    ingredients: string[]
    instructions: string[]
  }
  