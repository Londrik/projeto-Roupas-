
const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

// Rota de categoria ativada
router.get('/category/:categoryName', shopController.getCategoryProducts);

// Rotas que devem funcionar com os controllers atuais
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/login', shopController.getLogin);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-update-item', shopController.postCartUpdateItem);
router.post('/cart-delete-item', shopController.postCartDeleteItem);
router.get('/checkout', shopController.getCheckout);
router.get('/search', shopController.getSearch);

// Rotas comentadas que estavam causando o erro, pois seus controllers foram removidos ou simplificados.
// router.post('/checkout', shopController.postCheckout); 
// router.get('/payment', shopController.getPayment); 
// router.post('/order', shopController.postOrder); 
// router.get('/order-confirmation', shopController.getOrderConfirmation); 

module.exports = router;
