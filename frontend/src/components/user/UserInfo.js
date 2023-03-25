export function UserInfo (props) {
  const { user } = props

  return (
    <section>
      <h1>{user.display_name}</h1>
      <h2>{user.username} | {user.pronouns}</h2>
      <p>{user.bio}</p>
    </section>
  )
}
