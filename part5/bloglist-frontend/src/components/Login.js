import React from 'react'

const Login = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username: <input id='username' value={username} onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password: <input id='password' value={password} type="password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <div>
        <button id='login-button' type="submit">login</button>
      </div>
    </form>
  </div>
)

export default Login