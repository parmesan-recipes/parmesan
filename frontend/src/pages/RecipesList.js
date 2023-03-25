import { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { RecipeCard } from '../components/recipeView/RecipeCard'

export function RecipesList () {
  const [loading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState(null)

  useAsyncEffect(async () => {
    setLoading(true)
    setRecipes(null)

    const recipesRes = await fetch('/api/v1/recipe')
    if (recipesRes.ok) {
      recipesRes.json().then((recipes) => {
        setRecipes(recipes)
        setLoading(false)
      }).catch((err) => {
        console.error(err)
      })
    } else {
      setLoading(false)
    }
  })

  if (loading) {
    return (<h1>Loading</h1>)
  }

  return (
    <main>
      <h1>Recipes</h1>
      <ol>
        {
          recipes
            ? (
                recipes.map((recipe, index) => {
                  return (<li key={index}><RecipeCard recipe={recipe} index={index} /></li>)
                })
              )
            : (
              <h2>No recipes found!</h2>
              )
        }
      </ol>
    </main>
  )
}
