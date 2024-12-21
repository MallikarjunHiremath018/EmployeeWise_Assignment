import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user); // Update user in the backend
      // Pass the updated user back to UsersList via navigate
      navigate('/users', { state: { updatedUser: user } });
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-800  via-indigo-500 to-blue-700 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Edit User</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-lg font-semibold">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-lg font-semibold">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
