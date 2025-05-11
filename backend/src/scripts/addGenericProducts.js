const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const announcers = [
    'b6b6828e-69ba-43a7-ad3f-5e997645ecba',
    'ca5bc534-5660-4587-8dfe-4bb1ad0f42a0',
    '02245a40-4164-4ad8-a86a-a7a4b5757564',
    'b5960543-0abb-4681-8791-2dc1442ce5fa',
    'bd3bf879-14a3-47e0-930c-6a3f1b65860a'
];

const products = [
  {
    name: 'Smartphone Samsung Galaxy S22',
    price: '3499.99',
    location: 'São Paulo, SP',
    category: 'Eletrônicos',
    used: false,
    condition: 'Médio',
    images: ['samsung_s22_1.jpg', 'samsung_s22_2.jpg'],
    description: 'Smartphone potente com tela AMOLED, câmera de alta resolução e desempenho ideal para multitarefas e jogos.'
  },
  {
    name: 'Notebook Dell Inspiron i7 16GB',
    price: '4299.90',
    location: 'Campinas, SP',
    category: 'Eletrônicos',
    used: true,
    condition: 'Bom',
    images: ['notebook_dell_1.jpg'],
    description: 'Notebook com processador i7 de última geração e 16GB de RAM, ideal para estudos, trabalho e uso profissional.'
  },
  {
    name: 'Liquidificador Philips Walita Turbo',
    price: '229.00',
    location: 'Rio de Janeiro, RJ',
    category: 'Cozinha',
    used: false,
    condition: 'Bom',
    images: ['liquidificador_philips.jpg'],
    description: 'Liquidificador de alta potência com copo resistente e várias velocidades. Perfeito para sucos e vitaminas.'
  },
  {
    name: 'Conjunto de Panelas Tramontina 5 Peças',
    price: '379.90',
    location: 'Curitiba, PR',
    category: 'Cozinha',
    used: true,
    condition: 'Bom',
    images: ['panelas_tramontina.jpg'],
    description: 'Conjunto completo da Tramontina com 5 peças antiaderentes. Ótimo estado de conservação e ideal para o dia a dia.'
  },
  {
    name: 'Vestido Longo Estampado',
    price: '149.90',
    location: 'Belo Horizonte, MG',
    category: 'Moda',
    used: false,
    condition: 'Ruim',
    images: ['vestido_estampado.jpg'],
    description: 'Vestido longo com estampa floral, leve e confortável. Possui pequenos defeitos, mas ainda utilizável.'
  },
  {
    name: 'Tênis Adidas Ultraboost 42',
    price: '599.00',
    location: 'Fortaleza, CE',
    category: 'Moda',
    used: true,
    condition: 'Bom',
    images: ['tenis_adidas.jpg'],
    description: 'Tênis esportivo Adidas Ultraboost tamanho 42, muito confortável para caminhadas e corridas.'
  },
  {
    name: 'Poltrona Reclinável de Couro',
    price: '1250.00',
    location: 'São Paulo, SP',
    category: 'Decoração',
    used: true,
    condition: 'Médio',
    images: ['poltrona_couro.jpg'],
    description: 'Poltrona reclinável em couro sintético, ideal para sala de estar. Apresenta sinais de uso.'
  },
  {
    name: 'Conjunto de Quadros Decorativos Minimalistas',
    price: '200.00',
    location: 'Recife, PE',
    category: 'Decoração',
    used: false,
    condition: 'Bom',
    images: ['quadros_minimalistas.jpg'],
    description: 'Conjunto com 3 quadros minimalistas. Perfeito para modernizar e decorar ambientes com estilo.'
  },
  {
    name: 'Kit Maquiagem Ruby Rose Completo',
    price: '179.90',
    location: 'Salvador, BA',
    category: 'Beleza',
    used: false,
    condition: 'Novo',
    images: ['kit_maquiagem.jpg'],
    description: 'Kit completo com bases, sombras e batons da Ruby Rose. Produto novo e lacrado.'
  },
  {
    name: 'Secador de Cabelo Taiff 2000W',
    price: '199.00',
    location: 'São Luís, MA',
    category: 'Beleza',
    used: true,
    condition: 'Ruim',
    images: ['secador_taiff.jpg'],
    description: 'Secador potente de 2000W, ideal para uso doméstico. Funcionando, mas com sinais visíveis de uso.'
  },
  {
    name: 'Cama Pet Almofadada Grande',
    price: '120.00',
    location: 'Brasília, DF',
    category: 'Pets',
    used: false,
    condition: 'Bom',
    images: ['cama_pet.jpg'],
    description: 'Cama confortável e almofadada para pets de grande porte. Produto novo e muito resistente.'
  },
  {
    name: 'Coleira com Guia para Cães',
    price: '49.90',
    location: 'Porto Alegre, RS',
    category: 'Pets',
    used: true,
    condition: 'Bom',
    images: ['coleira_guia.jpg'],
    description: 'Coleira ajustável com guia, em ótimo estado. Ideal para cães de médio porte.'
  },
  {
    name: 'Kit Papelaria com Cadernos e Canetas',
    price: '85.50',
    location: 'Natal, RN',
    category: 'Papelaria',
    used: false,
    condition: 'Médio',
    images: ['kit_papelaria.jpg'],
    description: 'Kit completo com cadernos, canetas e adesivos. Ideal para estudantes e profissionais criativos.'
  },
  {
    name: 'Planner Semanal 2024',
    price: '39.90',
    location: 'Maceió, AL',
    category: 'Papelaria',
    used: false,
    condition: 'Bom',
    images: ['planner_2024.jpg'],
    description: 'Planner semanal 2024 com capa resistente e espaço para organização diária. Produto novo.'
  }
];
  

const categoryMap = {
  'Eletrônicos': 1,
  'Cozinha': 2,
  'Moda': 3,
  'Decoração': 4,
  'Beleza': 5,
  'Pets': 6,
  'Papelaria': 7
};

async function sendProduct(product, announcerId) {
  try {
    const form = new FormData();

    product.images.forEach((imageName) => {
      const imagePath = path.join(__dirname, 'images', imageName);
      form.append('images', fs.createReadStream(imagePath));
    });

    const mainImageIndex = 0;

    form.append('name', product.name);
    form.append('price', product.price);
    form.append('location', product.location);
    form.append('categoryId', categoryMap[product.category]);
    form.append('announcer', announcerId);
    form.append('used', product.used.toString());
    form.append('condition', product.condition);
    form.append('mainImageIndex', mainImageIndex.toString());
    form.append('description', product.description)

    const response = await axios.post('http://localhost:5000/products', form, {
      headers: form.getHeaders()
    });

    console.log(`✅ Produto "${product.name}" enviado com sucesso!`);
  } catch (error) {
    console.error(`❌ Erro ao enviar o produto "${product.name}":`, error.message);
  }
}

async function sendAllProducts() {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const announcerId = announcers[i % announcers.length]; // Distribui os anunciantes
    await sendProduct(product, announcerId);
  }
}

sendAllProducts();