const mongoose = require('mongoose');
const { Product } = require('../models/Product'); // Ajuste o caminho conforme sua estrutura

// Conecte-se ao banco de dados
mongoose.connect('mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const descriptions = {
  '6aad9c43-d321-4e43-9500-b2e45391b89d': 'Smartphone com tela de 5.7", processador Snapdragon 450, 3GB de RAM e câmera traseira dupla de 12MP + 5MP. Ideal para quem busca desempenho e custo-benefício.',
  'df071be0-f5cb-4d4b-a0a6-7f562ca3e90d': 'Panela de alumínio com revestimento antiaderente, ideal para o preparo de refeições diárias com praticidade e durabilidade.',
  '5ce435ec-ab93-44c6-af77-2a67165eb4f6': 'Camisa oficial do São Paulo FC para a temporada 2025/2026, confeccionada em poliéster com tecnologia NB Dry para melhor absorção de suor.',
  'e4c649f8-1cd7-45d8-b9cd-edd2de57c5bc': 'Conjunto de cerâmicas feitas à mão, com design único e acabamento rústico, perfeitas para decoração ou uso culinário.',
  '63b26f30-7512-45b3-b6f1-abf826162046': 'Aparador de cabelo com lâminas de aço inoxidável, ajuste de altura e bateria recarregável, proporcionando cortes precisos em casa.',
  'b0b1da8a-1415-407d-af56-c5d747cffbed': 'Alimento completo e balanceado para cães adultos, enriquecido com vitaminas e minerais essenciais para a saúde do seu pet.',
  '9fc9c7fc-1ed5-42ff-be3f-90b406da086e': 'Caneta esferográfica de luxo da Mont Blanc, com design elegante e escrita suave, símbolo de sofisticação e status.',
  'bba8b27c-1fb5-41ff-b515-643c2fca5248': 'Notebook leve e potente com processador Intel Core i5, 8GB de RAM e SSD de 256GB, ideal para trabalho e entretenimento.',
  'cb51c5f2-d5b1-496c-a1f5-8e9c979ddc3e': 'Smartphone moderno com tela AMOLED de 6.5", câmera tripla de 48MP e bateria de longa duração, oferecendo excelente desempenho.',
  '42ac4da8-a5b1-4baa-8fe2-c995b253c0f5': 'Liquidificador de alta potência com múltiplas velocidades, ideal para preparar sucos, vitaminas e massas com eficiência.',
  'b8ba109c-686a-4bee-92ef-387afa94cade': 'Smartphone premium com tela AMOLED de 6.1", processador Snapdragon 8 Gen 1, câmera de 50MP e design sofisticado.',
  'dc38bedf-c683-420c-a8df-71a3fd679224': 'Notebook robusto com processador Intel Core i7, 16GB de RAM e SSD de 512GB, perfeito para tarefas exigentes e multitarefa.',
  '7e81d40b-ca98-4c71-a146-a353a7a542eb': 'Liquidificador com motor de 1000W, jarra de 3L e lâminas ProBlend 4, garantindo misturas homogêneas e eficientes.',
  '36426f1a-f71e-4af2-b2e5-46d87e56bd01': 'Conjunto completo de panelas antiaderentes, com cabos ergonômicos e tampas de vidro, ideal para equipar sua cozinha.',
  'daffee9d-d168-46c5-81f8-b1d764fd0970': 'Vestido longo com estampa floral e detalhes em strass, confeccionado em viscose leve, perfeito para ocasiões especiais.',
  'c854b637-d3ef-40c5-8cea-274ccf32a86d': 'Tênis esportivo com tecnologia Boost, proporcionando conforto e retorno de energia, ideal para corridas e uso diário.',
  '0b2b42a4-0c74-4b94-bbbe-6757fde41e28': 'Poltrona reclinável em couro sintético, com apoio para os pés e encosto ajustável, oferecendo conforto e elegância.',
  '72c17fcc-f52c-49ba-83c7-6eb71d372e1d': 'Conjunto de quadros com design minimalista em preto e branco, ideal para dar um toque moderno à sua decoração.',
  '72ad3ac6-12a3-46c9-ab14-d2746008d9e6': 'Kit completo de maquiagem com paleta de sombras, batons, blush e pincéis, ideal para criar diversos looks.',
  'aa0f7697-8d78-4358-8472-9c63d9e94733': 'Secador profissional com motor de 2000W, 2 velocidades e 3 temperaturas, garantindo secagem rápida e eficiente.',
  'f17de8d3-7a38-4360-a365-68abdb810319': 'Cama confortável e espaçosa para cães de grande porte, com enchimento macio e capa removível para fácil limpeza.',
  'fe6b2c09-d66d-46d9-b756-7177c2d32d01': 'Kit completo de papelaria com cadernos, canetas, lápis e acessórios, ideal para estudantes e profissionais.',
  '492dec06-2fff-4d29-9a40-80e96a47857b': 'Planner semanal com layout funcional, espaço para anotações e metas, ajudando na organização do seu ano.'
}

const updateDescriptions = async () => {
  try {
    for (const [id, description] of Object.entries(descriptions)) {
      await Product.findByIdAndUpdate(id, { description });
    }
    console.log('✅ Descrições atualizadas com sucesso!');
    process.exit();
  } catch (err) {
    console.error('❌ Erro ao atualizar as descrições:', err);
    process.exit(1);
  }
};

updateDescriptions();