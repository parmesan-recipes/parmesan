import { useParams } from 'react-router-dom'
import { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { DateTime } from 'luxon'
import '../styles/RecipeView.scss'
import { IngredientGroup } from '../components/recipeView/IngredientGroup.js'
import { StepGroup } from '../components/recipeView/StepGroup.js'

export function RecipeView () {
  const { recipeId } = useParams()

  const [loading, setLoading] = useState(true)
  const [recipe, setRecipe] = useState(null)

  useAsyncEffect(async () => {
    setLoading(true)
    setRecipe(null)

    const recipeResponse = await fetch(`/api/v1/recipe/${recipeId}`)
    if (recipeResponse.ok) {
      recipeResponse.json().then(recipe => {
        setRecipe(recipe)
        setLoading(false)
      }).catch(error => {
        console.log(error)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [recipeId])

  if (loading) {
    return <h1>Loading</h1>
  }

  if (!recipe) {
    return (<h1>Not found</h1>)
  }

  const fmtDuration = (duration) => {
    const hours = Math.floor(duration / 3600)
    const remaining = duration - hours * 3600
    const minutes = Math.floor(remaining / 60)
    const seconds = remaining - minutes * 60

    return `${hours ? `${hours} hour${hours === 1 ? '' : 's'}` : ''} ` +
      `${minutes ? `${minutes} minute${minutes === 1 ? '' : 's'}` : ''} ` +
      `${seconds ? `${seconds} second${seconds === 1 ? '' : 's'}` : ''} `
  }

  const foregroundColor = ({ r, g, b }) => {
    const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000)
    return (brightness > 125) ? 'black' : 'white'
  }

  return (
    <main className='RecipeView'>
      <h2 id='title'>{recipe.name}</h2>
      <h6 id='creationDate'>Creation date: {DateTime.fromSeconds(recipe.creationDate).toLocaleString(DateTime.DATETIME_FULL)}</h6>
      <h6 id='modificationDate'>Modification date: {DateTime.fromSeconds(recipe.modificationDate).toLocaleString(DateTime.DATETIME_FULL)}</h6>

      <ul id='tags'>
        {recipe.tags.map((tag, index) => {
          return (<li key={index} style={{ backgroundColor: `rgb(${tag.color.r}, ${tag.color.g}, ${tag.color.b})`, color: foregroundColor(tag.color) }}>{tag.name}</li>)
        })}
      </ul>

      <div id='times'>
        <p>Prep time: {fmtDuration(recipe.time.prep)}</p>
        <p>Cooking time: {fmtDuration(recipe.time.cook)}</p>
        <p>Total time: {fmtDuration(recipe.time.cook + recipe.time.prep)}</p>
      </div>

      <ul id='images'>
        {recipe.images.map((image) => {
          return (
            <li key={image.url}>
              <figure>
                <img src={image.url} alt={image.alt} />
                {image.caption && <figcaption>{image.caption}</figcaption>}
              </figure>
            </li>
          )
        })}
      </ul>

      <section>
        <h4>Ingredients</h4>

        {recipe.ingredientGroups.map((ingredientGroup, index) => {
          return (
            <IngredientGroup ingredientGroup={ingredientGroup} key={index} />
          )
        })}
      </section>

      <section>
        <h4>Method</h4>

        {recipe.stepGroups.map((stepGroup, index) => {
          return (
            <StepGroup stepGroup={stepGroup} key={index} />
          )
        })}
      </section>

    </main>
  )
}
