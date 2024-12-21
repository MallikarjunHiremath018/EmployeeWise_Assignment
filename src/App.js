import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;