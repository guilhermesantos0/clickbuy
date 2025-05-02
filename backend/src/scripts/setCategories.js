const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const categories = [
    {
        name: 'Eletrônicos',
        icon: './images/eletronicosImg.svg'
    },
    {
        name: 'Cozinha',
        icon: './images/cozinhaImg.svg'
    },
    {
        name: 'Moda',
        icon: './images/modaImg.svg'
    },
    {
        name: 'Decoração',
        icon: './images/decoracaoImg.svg'
    },
    {
        name: 'Beleza',
        icon: './images/belezaImg.svg'
    },
    {
        name: 'Pets',
        icon: './images/petsImg.svg'
    },
    {
        name: 'Papelaria',
        icon: './images/papelariaImg.svg'
    }
]

async function setCategories() {
    for (const category of categories) {
        const form = new FormData();
        form.append('name', category.name);
        form.append('icon', fs.createReadStream(path.resolve(__dirname, category.icon)));

        try {
            const response = await axios.post('http://localhost:5000/categories', form, {
                headers: form.getHeaders()
            })

            console.log(`✅ Categoria adicionada: ${response.data.name}`)
        } catch (error) {
            console.error(`❌ Erro ao adicionar ${category.name}:`, error.response?.data || error.message);
        }
    }
}

setCategories();