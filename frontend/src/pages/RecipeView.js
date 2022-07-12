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

    //  Get from server

    await new Promise(resolve => setTimeout(resolve, 100))

    setRecipe({
      recipeId,
      name: 'Spaghetti Bolognese',
      creationDate: 1657463823,
      modificationDate: 1657386596,
      tags: [{ name: 'spag', color: { r: 255, g: 78, b: 0 } }, { name: 'bol', color: { r: 0, g: 0, b: 0 } }],
      time: {
        prep: 15023,
        cook: 121
      },
      images: [
        { url: 'https://placekitten.com/300/200', alt: 'Spag bol finished with parmesan', caption: 'Finished spaghetti Bolognese topped with parmesan' },
        { url: 'https://placekitten.com/300/201', alt: 'Spag bol in pot', caption: 'Finished spaghetti Bolognese in the pot' },
        { url: 'https://placekitten.com/300/202', alt: 'Spag bol' }
      ],
      ingredientGroups: [
        {
          name: 'Bolognese',
          ingredients: [
            { name: 'Meat', amount: 500, unit: 'g' },
            { name: 'Passata', amount: 500, unit: 'g' },
            { name: 'carrot', amount: 2, unit: '' },
            { name: 'pesto', amount: 3, unit: 'tsp' },
            { name: 'oregano', amount: 3, unit: 'tsp' },
            { name: 'stock cubes', amount: 2, unit: '' }
          ]
        },
        {
          name: 'spaghetti',
          ingredients: [
            { name: 'Spaghetti', amount: 100, unit: 'g' }
          ]
        }
      ],
      stepGroups: [
        {
          name: 'Vegetable prep',
          steps: [
            { text: 'Dice onions' },
            { text: 'Crush garlic' },
            { text: 'Grate carrot' }
          ]
        },
        {
          name: 'Bolognese',
          steps: [
            { text: 'Fry onions until they look right' },
            { text: 'Add garlic to onions and fry for 5 minutes more' },
            { text: 'Add carrot for 5 minutes' },
            { text: 'Add minced meat and cook until it starts to turn grey' },
            { text: 'Add passata, stock cubes, oregano and pesto and simmer until desired consistency, stir every five minutes' }
          ]
        },
        {
          name: 'Spaghetti',
          steps: [
            { text: 'Bring pan of water to boil' },
            { text: 'Put in spaghetti and cook for 10 minutes' },
            { text: 'Strain spaghetti in a sieve or colander' }
          ]
        }
      ]
    })
    setLoading(false)
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
      <h2 id="title">{recipe.name}</h2>
      <h6 id="creationDate">Creation date: {DateTime.fromSeconds(recipe.creationDate).toLocaleString(DateTime.DATETIME_FULL)}</h6>
      <h6 id="modificationDate">Modification date: {DateTime.fromSeconds(recipe.modificationDate).toLocaleString(DateTime.DATETIME_FULL)}</h6>

      
      <ul id='tags'>
        {recipe.tags.map((tag, index) => {
          return (<li key={index} style={{ backgroundColor: `rgb(${tag.color.r}, ${tag.color.g}, ${tag.color.b})`, color: foregroundColor(tag.color) }}>{tag.name}</li>)
        })}
      </ul>

      
      <div id="times">
        <p>Prep time: {fmtDuration(recipe.time.prep)}</p>
        <p>Cooking time: {fmtDuration(recipe.time.cook)}</p>
        <p>Total time: {fmtDuration(recipe.time.cook + recipe.time.prep)}</p>
      </div>


      <ul id="images">
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
            <IngredientGroup ingredientGroup={ingredientGroup} key={index}/>
          )
        })}
      </section>

      
      <section>
        <h4>Method</h4>

        {recipe.stepGroups.map((stepGroup, index) => {
          return (
            <StepGroup stepGroup={stepGroup} key={index}/>
          )
        })}
      </section>

    </main>
  )
}
