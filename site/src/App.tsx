import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';

import Login from 'pages/Login';
import RecuperarSenha from 'pages/Login/RecuperarSenha';
import RedefinirSenha from 'pages/Login/RedefinirSenha';
import Cadastro from 'pages/Cadastro';

import Anunciar from 'pages/Anunciar';
import Admin from 'pages/Admin';
import EditarPerfil from 'pages/EditarPerfil';

import Favoritos from 'pages/Favoritos';

import AboutUs from 'pages/Institucional/pages/AboutUs';
import Contact from 'pages/Institucional/pages/Contact';
import TermsOfUse from 'pages/Institucional/pages/TermsOfUse';
import PrivacyPolicy from 'pages/Institucional/pages/PrivacyPolicy';

import Category from 'pages/Category';
import ProductPage from 'pages/Category/Product';

import Admin2 from 'pages/Admin/Admin2';

import Garantia from 'pages/Ajuda/pages/Garantia';
import TrocaDevolucao from 'pages/Ajuda/pages/TrocaDevolucao';
import Frete from 'pages/Ajuda/pages/Frete';

import NotFound from 'pages/404';

import UserProducts from 'pages/UserProducts';
import EditarProduto from 'pages/EditarProduto';

import CheckoutPage from 'pages/Checkout';
import Confirm from 'pages/Checkout/Confirm';

import Cart from 'pages/Carrinho';
import UserPage from 'pages/User';

import MeusPedidos from 'pages/MeusPedidos';

import SearchPage from 'pages/Pesquisa';

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
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />

        <Route path="/anunciar" element={<Anunciar />} />
        <Route path="/admin2" element={<Admin />} />

        <Route path="/admin" element={<Admin2 />} />

        <Route path="/favoritos" element={<Favoritos />} />

        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/pesquisa" element={<SearchPage />} />

        <Route path="/institucional/sobrenos" element={<AboutUs />} />
        <Route path="/institucional/contato" element={<Contact />} />
        <Route path="/institucional/termos-de-uso" element={<TermsOfUse />} />
        <Route path="/institucional/politica-de-privacidade" element={<PrivacyPolicy />} />

        <Route path="/:category" element={<Category />} />
        <Route path="/:category/:id" element={<ProductPage />} />
        <Route path="/:category/:id/editar" element={<EditarProduto />} />
        
        <Route path="/comprar" element={<CheckoutPage />} />
        <Route path="/comprar/sucesso" element={<Confirm />} />

        <Route path="/ajuda/garantia" element={<Garantia/>} />
        <Route path="/ajuda/trocadevolucao" element={<TrocaDevolucao/>} />
        <Route path="/ajuda/frete" element={<Frete/>} />

        <Route path="/meus-pedidos" element={<MeusPedidos />} />

        <Route path="/404" element={<NotFound />} />

        <Route path="/meus-produtos" element={<UserProducts />} />
      </Routes>

      <ToastContainer position="bottom-left" style={{ zIndex: 9999 }} theme="dark" />
    </UserProvider>
  );
}

export default App;
