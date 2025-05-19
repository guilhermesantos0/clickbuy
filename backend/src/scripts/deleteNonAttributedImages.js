const fs = require('fs');
const path = require('path');
const { Product } = require('../models/Product'); // ajuste o path conforme necessário
const mongoose = require('mongoose');
require('dotenv').config();

const uploadsDir = path.join(__dirname, '..', 'upload');

const startCleanup = async () => {
  try {
    await mongoose.connect("mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    const products = await Product.find({});
    const usedImages = new Set(products.flatMap(p => p.images));

    const allFiles = fs.readdirSync(uploadsDir);
    const deletions = [];

    for (const file of allFiles) {
      const filePath = `../${file}`;
      const fullPath = path.join(uploadsDir, file);

      const isSVG = path.extname(file).toLowerCase() === '.svg';
      const isUsed = usedImages.has(filePath);

      if (!isSVG && !isUsed) {
        fs.unlinkSync(fullPath);
        deletions.push(file);
      }
    }

    console.log(`Arquivos deletados: ${deletions.length}`);
    mongoose.disconnect();
  } catch (err) {
    console.error('Erro na limpeza de imagens órfãs:', err);
    mongoose.disconnect();
  }
};

startCleanup();
