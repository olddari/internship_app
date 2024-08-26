import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    
    <div>

      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form className='log-form'>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"/>

        <Link to='/admin' className='btn mt-5'>Log In</Link>
        
      </form>

    </div>

  )
}

export default Login
