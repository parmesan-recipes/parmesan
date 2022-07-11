import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.js'
import { useContext } from 'react'

export function Login () {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)

  const submit = async (values, formik) => {
    console.log(values)

    const res = await fetch(
      '/api/v1/user/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

    if (res.status === 200) {
      const user = await res.json()
      setUser(user)
      navigate('/')
    } else {
      formik.setFieldError('username', 'Username or password is incorrect.')
    }
  }

  return (
    <Formik initialValues={{ username: '', password: '' }} onSubmit={submit}>

      {({ isSubmitting }) => (

        <Form>
          <label htmlFor='username'>Username</label>
          <Field type='text' name='username' />
          <ErrorMessage name='username' component='div' />

          <label htmlFor='password'>Password</label>
          <Field type='password' name='password' />
          <ErrorMessage name='password' component='div' />
          <button type='submit' disabled={isSubmitting}>Submit</button>

        </Form>

      )}

    </Formik>
  )
}
