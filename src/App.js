import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Users from './pages/Users';
import { UsersPosts } from './pages/UsersPosts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id/posts" element={<UsersPosts />} />
      {/* /users/:id/posts */}
      
    </Routes>
  );
}

export default App;
