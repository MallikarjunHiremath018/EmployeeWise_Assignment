import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Login Component
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/users');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-800  via-indigo-500 to-blue-700">
      <div className="p-8 bg-white shadow-2xl rounded-lg w-96 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Welcome Back</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 border rounded mb-4 focus:ring focus:ring-teal-400 focus:outline-none shadow-sm"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 border rounded mb-4 focus:ring focus:ring-teal-400 focus:outline-none shadow-sm"
        />
        <button 
          onClick={handleLogin} 
          className="w-full p-3 bg-gradient-to-br from-gray-900 via-purple-800 to-blue-700 text-white rounded-lg hover:from-blue-500 hover:to-purple-800 transition-all duration-400">
          Log In
        </button>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        <p className="text-sm text-gray-500 text-center mt-4">Forgot Password? <span className="text-blue-500 cursor-pointer">Reset here</span></p>
      </div>
    </div>
  );
};

export default Login;
