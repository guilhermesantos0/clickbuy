import React, { useState } from 'react';
import style from './Comprar.module.scss';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    endereco: '',
    numeroCartao: '',
    validade: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de envio dos dados para a API
    alert('Pagamento processado com sucesso!');
  };

  return (
    <div className={style.checkoutContainer}>
      <div className={style.orderSummary}>
        <h2>Resumo do Pedido</h2>
        <div className={style.productDetails}>
          <img src="https://via.placeholder.com/150" alt="Produto" />
          <div>
            <h3>Nome do Produto</h3>
            <p>R$ 199,99</p>
          </div>
        </div>
        <div className={style.total}>
          <span>Total:</span>
          <strong>R$ 199,99</strong>
        </div>
      </div>
      <form className={style.paymentForm} onSubmit={handleSubmit}>
        <h2>Informações de Pagamento</h2>
        <label>
          Nome Completo
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Endereço
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Número do Cartão
          <input
            type="text"
            name="numeroCartao"
            value={formData.numeroCartao}
            onChange={handleChange}
            required
            maxLength={16}
          />
        </label>
        <div className={style.cardDetails}>
          <label>
            Validade
            <input
              type="text"
              name="validade"
              value={formData.validade}
              onChange={handleChange}
              placeholder="MM/AA"
              required
            />
          </label>
          <label>
            CVV
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              maxLength={3}
            />
          </label>
        </div>
        <button type="submit">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
