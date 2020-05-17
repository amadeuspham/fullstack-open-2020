import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TextField,
  Button,
} from '@material-ui/core'

import {setUsername, setPassword } from '../reducers/loginFormReducer'

const Login = ({ handleLogin }) => {
  const dispatch = useDispatch()
  const formValues = useSelector(state => state.loginForm)
  const {username, password} = formValues

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <TextField id='username' label='Username' value={username} onChange={({ target }) => dispatch(setUsername(target.value))}/>
        </div>
        <div>
          <TextField id='password' label='Password' value={password} type="password" onChange={({ target }) => dispatch(setPassword(target.value))} />
        </div>
        <div>
          <Button variant='contained' color='primary' id='login-button' type="submit">login</Button>
        </div>
      </form>
    </div>
  )
}

export default Login