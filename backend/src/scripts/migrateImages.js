// migrateImagesToCloudinary.js

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'djpsh9m4y',
    api_key: '523597717777722',
    api_secret: '8z1gN0rkulyo11Ou_Kr8ZuuzIuU',
});

mongoose.connect('mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const { Product } = require('../models/Product');
const User = require('../models/User');
const Category = require('../models/Category');

const uploadImage = async (localPath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
        folder,
        use_filename: true,
        unique_filename: false,
    });
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Erro ao fazer upload da imagem ${localPath}:`, error.message);
    return null;
  }
};

const migrateImages = async () => {
    try {
        const products = await Product.find();
        for (const product of products) {
            let updated = false;
            const newImages = [];

            for (const imagePath of product.images) {
                if (imagePath.startsWith('http')) {
                    newImages.push(imagePath);
                    continue;
                }

                const localImagePath = path.join(__dirname, '..', 'upload', path.basename(imagePath));
                if (fs.existsSync(localImagePath)) {

                    const uploadedUrl = await uploadImage(localImagePath, 'produtos');
                    if (uploadedUrl) {
                        newImages.push(uploadedUrl);
                        updated = true;
                    } else {
                        newImages.push(imagePath);
                    }
                } else {
                    console.warn(`⚠️ Imagem não encontrada: ${localImagePath}`);
                    newImages.push(imagePath);
                }
            }

            if (updated) {
                product.images = newImages;
                product.mainImage = newImages[0];
                await product.save();
                console.log(`✅ Produto atualizado: ${product.name}`);
            }
        }

        const users = await User.find();
        for (const user of users) {
            const imagePath = user.profilePic;
            if (imagePath && !imagePath.startsWith('http')) {
                const localImagePath = path.join(__dirname, '..', 'upload', path.basename(imagePath));
                if (fs.existsSync(localImagePath)) {
                    const uploadedUrl = await uploadImage(localImagePath, 'usuarios');
                    if (uploadedUrl) {
                        user.profilePic = uploadedUrl;
                        await user.save();
                        console.log(`✅ Usuário atualizado: ${user.email}`);
                    }
                } else {
                    console.warn(`⚠️ Imagem de usuário não encontrada: ${localImagePath}`);
                }
            }
        }

        const categories = await Category.find();
        for (const category of categories) {
            const iconPath = category.icon;
            if (iconPath && !iconPath.startsWith('http')) {
                const localIconPath = path.join(__dirname, '..', 'upload', path.basename(iconPath));
                if (fs.existsSync(localIconPath)) {
                    const uploadedUrl = await uploadImage(localIconPath, 'categorias');
                    if (uploadedUrl) {
                        category.icon = uploadedUrl;
                        await category.save();
                        console.log(`✅ Categoria atualizada: ${category.name}`);
                    }
                } else {
                console.warn(`⚠️ Ícone de categoria não encontrado: ${localIconPath}`);
                }
            }
        }

        console.log('✔️ Migração concluída com sucesso!');
        mongoose.disconnect();
    } catch (error) {
        console.error('❌ Erro durante a migração:', error.message);
        mongoose.disconnect();
    }
};

migrateImages();
