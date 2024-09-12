import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Doctor/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import AdminDashboard from './pages/Admin/AdminDashboard';
//import UserManagementPage from './pages/Admin/AdminDashboard2';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/admin/*' element={<PrivateRoute element={<AdminDashboard />} />} />
      </Routes>
    </div>
  );
}

export default App;
