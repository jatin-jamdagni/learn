"use client";
import React, { useEffect, useState, useRef } from "react";

 interface Recipe {
  id: number;
  userId: number;
  name: string;
  image: string;
  cuisine: string;
  mealType: string[];
  tags: string[];
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  instructions: string[];
}

const Home = () => {
   const [recipe, setRecipe] = useState<string>("");
   const [data, setData] = useState<Recipe[]>([]);
   const [listVisible, setListVisible] = useState<boolean>(false);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   useEffect(() => {
     if (!recipe.trim()) {
      setData([]);
       setListVisible(false);
      return;
    }

     if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

     timeoutRef.current = setTimeout(async () => {
      try {
         const response = await fetch(
          `https://dummyjson.com/recipes/search?q=${encodeURIComponent(recipe)}`
        );
         if (!response.ok) {
            console.error("API call failed:", response.status, response.statusText);
            setData([]);
            return;
        }
        const json = await response.json();
         setData(json.recipes || []);
         if (json.recipes && json.recipes.length > 0) {
             setListVisible(true);
        } else {
             setListVisible(false);  
        }

      } catch (error) {
         console.error("Failed to fetch recipes:", error);
        setData([]);
        setListVisible(false);
      }
    }, 300); 

     return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [recipe]);  

   const handleSelect = (selectedRecipe: string) => {
    setRecipe(selectedRecipe);  
    setData([]);  
    setListVisible(false); 
  };

   const handleBlur = () => {
    setTimeout(() => {
      setListVisible(false);
    }, 100);  
  };

  return (
     <div className="flex flex-col items-center pt-20 px-4 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
       <div className="w-full max-w-md relative"> 
         <input
          type="text"
          placeholder="Search for a recipe..."
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
           onBlur={handleBlur} 
          onMouseDown={() => { if (data.length > 0) setListVisible(true); }} 
          className="w-full py-3 px-5 rounded-lg border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-lg"
        />

         {listVisible && data.length > 0 && (
           <ul className="absolute z-10 w-full mt-2 rounded-lg border border-gray-700 bg-gray-800 max-h-60 overflow-y-auto shadow-xl">
             {data.map((item) => (
              <li
                key={item.id}
                 onMouseDown={() => handleSelect(item.name)}
                className="py-3 px-5 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer transition duration-150 ease-in-out first:rounded-t-lg last:rounded-b-lg"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
