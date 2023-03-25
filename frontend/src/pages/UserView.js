import { UserContext } from '../context/UserContext.js'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import useAsyncEffect from 'use-async-effect';
import { UserInfo } from '../components/user/UserInfo.js';
import { useState } from 'react'

export function UserView () {
  const { userId } = useParams();

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useAsyncEffect( async () => {
    setLoading(true)
    setUser(null)

  //   const userResponse = await fetch(`/api/v1/user/${userId}`)
  //   if (userResponse.ok) {
  //     userResponse.json().then((user) => {
  //       setUser(user)
  //       setLoading(false)
  //     }).catch((err) => {
  //       console.error(err)
  //       setLoading(false)
  //     })
  //   } else {
  //     setLoading(false)
  //   }
    setUser({
      id: "abcde",
      username: "jdoe",
      display_name: "Joan Doe",
      pronouns: "she/they",
      bio: "I am a cook, let me cook!"
    })
    setLoading(false)
  }, [userId])

  if (loading) {
    return (<h1>Loading</h1>)
  }

  if (!user) {
    return (<h1>User not found!</h1>)
  }

  return (
    <UserInfo user={user} />
  )
}