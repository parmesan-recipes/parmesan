import { ErrorMessage, Field, Form, Formik } from 'formik'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../context/UserContext.js'
import { useContext } from 'react'


export function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext);
  
  const submit = async (values, formik) => {
    console.log(values);
    
    const data = new URLSearchParams([["username", values.username], ["password", values.password]]);
    
    const res = await fetch('/api/v1/auth/login/password', {method: 'POST', body: data});
    
    if (res.status === 200) {
      const user = await res.json()
      
      setUser(user)
      
      navigate('/')
    } else {
      formik.setFieldError("email", "Username or password is incorrect.");
    }
    
  }
  
  return (
    <Formik initialValues={{email: '', password: '',}} onSubmit={submit}>
  
      {({isSubmitting}) => (
        
          <Form>
            <label htmlFor="email">Email</label>
            <Field type={"email"} name="email"></Field>
            <ErrorMessage name="email" component="div"/>
            
            <label htmlFor="password">Password</label>
            <Field type={"password"} name="password"></Field>
            <ErrorMessage name="password" component="div"/>
            <button type="submit" disabled={isSubmitting}>Submit</button>
            
          
          
          </Form>
        
        )}
    
    </Formik>
  )
}
