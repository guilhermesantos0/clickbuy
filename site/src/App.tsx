import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Anunciar from './pages/Anunciar';
import Admin from './pages/Admin';
import EditarPerfil from './pages/EditarPerfil';

import AboutUs from './pages/Institucional/pages/AboutUs';
import Contact from './pages/Institucional/pages/Contact';
import TermsOfUse from './pages/Institucional/pages/TermsOfUse';
import PrivacyPolicy from './pages/Institucional/pages/PrivacyPolicy';

import Category from './pages/Category';
import ProductPage from './pages/Category/Product';

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
        <Route path="/anunciar" element={<Anunciar />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />

        <Route path="/institucional/sobrenos" element={<AboutUs />} />
        <Route path="/institucional/contato" element={<Contact />} />
        <Route path="/institucional/termos-de-uso" element={<TermsOfUse />} />
        <Route path="/institucional/politica-de-privacidade" element={<PrivacyPolicy />} />

        <Route path="/:category" element={<Category />} />
        <Route path="/:category/:id" element={<ProductPage />} />
      </Routes>

      <ToastContainer style={{ zIndex: 9999 }} theme="colored" />
    </UserProvider>
  );
}

export default App;
