import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Announce from './pages/Announce';
import Admin from './pages/Admin';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserProvider } from 'contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/anunciar" element={<Announce />} />
        <Route path="/admin" element={<Admin />} />
        
      </Routes>

      <ToastContainer style={{ zIndex: 9999 }} theme="colored" />
    </UserProvider>
  );
}

export default App;
