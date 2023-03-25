import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAsyncEffect from 'use-async-effect'
import { UserInfo } from '../components/user/UserInfo.js'
import { RecipeCard } from '../components/recipeView/RecipeCard.js'

export function UserView () {
  const { userId } = useParams()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [recipes, setRecipes] = useState(null)

  useAsyncEffect(async () => {
    setLoading(true)
    setUser(null)

    const userResponse = await fetch(`/api/v1/user/${userId}`)
    if (userResponse.ok) {
      userResponse.json().then(async (user) => {
        setUser(user)
        const recipeResponse = await fetch(`/api/v1/recipe?username=${userId}`)
        if (recipeResponse.ok) {
          recipeResponse.json().then((recipe) => {
            setRecipes(recipe)
            setLoading(false)
          }).catch((err) => {
            console.error(err)
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    } else {
      setLoading(false)
    }
  }, [userId])

  if (loading) {
    return (<h1>Loading</h1>)
  }

  if (!user) {
    return (<h1>User not found!</h1>)
  }

  return (
    <main>
      <UserInfo user={user} />

      <section>
        {
          recipes
            ? (
              <div id='recipes'>
                <h1>Recipes</h1>
                <ul>
                  {
                  recipes.map((recipe, index) => {
                    return (
                      <li key={index}><RecipeCard recipe={recipe} index={index} /></li>
                    )
                  })
                }
                </ul>
              </div>
              )
            : (
              <h1>User has no recipes</h1>
              )
        }
      </section>
    </main>

  )
}
