// Importa o framework Express.
const express = require('express');

// Cria um novo objeto de roteador do Express.
const router = express.Router();

// Importa o controlador da loja, que contém a lógica para as rotas.
const controladorDaLoja = require('../controllers/shop');

// Define uma rota GET para a raiz do site ('/').
// Quando um usuário acessa a página inicial, a função getIndex do controlador da loja é chamada.
router.get('/', controladorDaLoja.getIndex);

// Exporta o roteador para que ele possa ser usado no arquivo principal do aplicativo (index.js).
module.exports = router;