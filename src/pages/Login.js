import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://localhost:44309/api/Customer/username/${username}`);

      if (response.ok) {
        const customer = await response.json();
        console.log('Fetched Customer:', customer);

        if (customer.password === password) {
          localStorage.setItem('loggedInUser', JSON.stringify(customer));
          console.log('Login successful, navigating to admin');

          navigate('/admin'); 
        } else {
          console.error('Invalid credentials');
          alert('Invalid username or password');
        }
      } else {
        console.error('Failed to fetch customer data');
        alert('Unable to fetch customer data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="log-form" onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="username">First Name</label>
        <input
          type="text"
          placeholder="First Name"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="mt-3" htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn mt-5">Log In</button>
        <Link to='/signup' className="btn mt-4">Sign-Up</Link>
      </form>
    </div>
  );
};

export default Login;
