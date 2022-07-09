import { useParams } from 'react-router-dom'
import { useState } from 'react'
import useAsyncEffect from 'use-async-effect'


export function RecipeView() {
  const {recipeId} = useParams()
  
  const [loaded, setLoaded] = useState(false)
  const [recipe, setRecipe] = useState(null)
  
  useAsyncEffect(async () => {
    setLoaded(false)
    setRecipe(null)
    
  //  Get from server
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setRecipe({
      recipeId: recipeId,
      name: "Spaghetti Bolognese",
      creationDate: 1657386596,
      modificationDate: 1657386596,
      time: {
        prep: 150,
        cook: 100
      },
      images: [
        {url: "url", alt: "Spag bol"}
      ],
      ingredientGroups: [
        {
          name: "Bolognese",
          ingredients: [
            {ingredient: "Meat", amount: 500, unit: "g"},
            {ingredient: "Passata", amount: 500, unit: "g"},
            {ingredient: "carrot", amount: 2, unit: ""}
          ]
        },
        {
          name: "spaghetti",
          ingredients: [
            {ingredient: "Spaghetti", amount: 100, unit: "g"},
          ]
        }
        
      ],
      stepGroups: [
        {
          name: "Bolognese",
          steps: [
            {text: "Make it"}
          ]
        },
        {
          name: "Spaghetti",
          steps: [
            {text: "Make it but spaghetti"}
          ]
        }
      ]
    })
    setLoaded(true)
  
  }, [recipeId])
  
  
  
  if (loaded) {
    if (!recipe) {
      return (<h1>Not found</h1>)
    } else {
      return (
        <h1>{recipeId}</h1>
      )
    }
  } else {
    return (<h1>Loading</h1>)
  }
}
