
require('dotenv').config(); // Carrega as variáveis do arquivo .env
const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

// ROTAS E CONTROLLERS
const rotasDaLoja = require('./routes/shop');
const rotasDaApi = require('./routes/api'); // <<< CORREÇÃO: Importando as rotas da API
const controladorDeErro = require('./controllers/error');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

// Verificação de segurança: Garante que a URI do MongoDB está presente
if (!mongoUri) {
    throw new Error('A variável de ambiente MONGO_URI não foi definida! Verifique seu arquivo .env');
}

// CONFIGURAÇÃO DO EXPRESS
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'supersecretsecret',
    resave: false,
    saveUninitialized: false
}));

// SIMULAÇÃO DE CARRINHO (PARA EVITAR ERROS)
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = { items: [], totalPrice: 0 };
    }
    res.locals.cart = req.session.cart;
    next();
});

// USO DAS ROTAS
app.use('/api', rotasDaApi); // <<< CORREÇÃO: Usando as rotas da API para caminhos que começam com /api
app.use(rotasDaLoja); // Esta linha agora cuidará da rota '/', renderizando sua loja.
app.use(controladorDeErro.get404);

// FUNÇÃO PARA INICIAR O SERVIDOR APÓS CONECTAR AO BANCO
const startServer = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Conectado ao MongoDB com sucesso!');
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1); // Encerra a aplicação se não conseguir conectar ao banco
    }
};

// Inicia a aplicação
startServer();
