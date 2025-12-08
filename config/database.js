const mongoose = require('mongoose');

// String de conexão COMPLETA e direta para o cluster de teste gratuito do MongoDB Atlas
const dbURI = 'mongodb+srv://gemini-user:gemini-user@cluster0.f3axpvu.mongodb.net/loja-de-roupas?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        // Opções de conexão atualizadas para a versão mais recente do driver
        await mongoose.connect(dbURI);
        console.log('Conectado ao MongoDB Atlas!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
