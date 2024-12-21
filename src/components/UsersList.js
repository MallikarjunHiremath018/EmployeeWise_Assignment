import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize fetchUsers to prevent unnecessary re-renders
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [page, fetchUsers]); // Now we are using the memoized fetchUsers function

  // Check if updated user is passed through the location state and update users
  useEffect(() => {
    if (location.state && location.state.updatedUser) {
      const updatedUser = location.state.updatedUser;
      // Update the user in the list
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    }
  }, [location.state]);

  // Handle search query change
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredUsers(users); // Show all users if the search query is empty
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(lowercasedQuery) ||
          user.last_name.toLowerCase().includes(lowercasedQuery) ||
          user.email.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800  via-indigo-500 to-blue-700 p-8">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-all duration-200"
      >
        Logout
      </button>

      <h2 className="text-3xl font-bold text-center mb-10 text-white">User List</h2>

      <div className="mb-10 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/2 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search users by name or email..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-30">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-6 bg-purple-950 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 hover:z-10 transition-all duration-300 ease-in-out transform relative"
          >
            <img
              src={user.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center text-white">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-center text-gray-500 mb-4 text-white">{user.email}</p>
            <div className="flex justify-start space-x-4">
              <button
                onClick={() => handleEdit(user.id)}
                className="py-2 px-4 bg-blue-400 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="py-2 px-4 bg-red-400 text-white rounded-lg text-sm font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="p-2 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-black transition-all duration-200"
        >
          Prev
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="p-2 bg-gray-800 rounded-lg text-white font-semibold hover:bg-black transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;