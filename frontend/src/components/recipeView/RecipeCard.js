import { useParams } from 'react-router-dom'
import { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { DateTime } from 'luxon'
import '../../styles/components/RecipeCard.scss'

export function RecipeCard (props) {
  const { recipe } = props

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
    <section class='RecipeCard'>
      <a href={`/recipe/${recipe.recipeId}`}>
      <img src={recipe.images[0].url} alt={recipe.images[0].alt} />
      <h3>{recipe.name}</h3>
      <p>Duration: {fmtDuration(recipe.time.prep + recipe.time.cook)}</p>
      <p>Created: {DateTime.fromSeconds(recipe.creationDate).toLocaleString(DateTime.DATETIME_FULL)}</p>
      {
        recipe.creationDate != recipe.modificationDate ? (
          <p>Modified: {DateTime.fromSeconds(recipe.modificationDate).toLocaleString(DateTime.DATETIME_FULL)}</p>
        ) : (null)
      }
      {
        recipe.tags.map((tag, index) => {
          return (<li key={index} style={{ backgroundColor: `rgb(${tag.color.r}, ${tag.color.g}, ${tag.color.b})`, color: foregroundColor(tag.color) }}>{tag.name}</li>)
        })
      }
      </a>
    </section>
  )
}