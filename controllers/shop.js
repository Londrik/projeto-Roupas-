
const Product = require('../models/product');
const Cart = require('../models/cart');

// FUNÇÕES DE RENDERIZAÇÃO DE PÁGINA - AGORA CORRIGIDAS COM ASYNC/AWAIT

exports.getIndex = async (req, res, next) => {
    try {
        const products = await Product.find(); // Forma correta de buscar produtos
        res.render('index', {
            pageTitle: 'SSERAFIM - Início',
            path: '/',
            products: products
        });
    } catch (err) {
        console.error("Erro ao buscar produtos para getIndex:", err);
        next(err); // Passa o erro para o middleware de erro do Express
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.render('shop/product-list', {
            pageTitle: 'SSERAFIM - Todos os Produtos',
            path: '/products',
            products: products
        });
    } catch (err) {
        console.error("Erro em getProducts:", err);
        next(err);
    }
};

exports.getCategoryProducts = async (req, res, next) => {
    try {
        const categoryName = req.params.categoryName;
        const products = await Product.find({ categorySlug: categoryName });
        
        const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace(/-/g, ' ');

        res.render('shop/product-list', {
            pageTitle: `SSERAFIM - ${pageTitle}`,
            path: '/products',
            products: products
        });
    } catch (err) {
        console.error("Erro em getCategoryProducts:", err);
        next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Produto Não Encontrado', path: '/404' });
        }
        res.render('product-detail', {
            pageTitle: `SSERAFIM - ${product.name}`,
            product: product,
            path: '/products'
        });
    } catch (err) {
        console.error("Erro em getProduct:", err);
        next(err);
    }
};

// LÓGICA DO CARRINHO - TAMBÉM CORRIGIDA

exports.postCart = async (req, res, next) => {
    try {
        const productId = req.body.productId;
        const size = req.body.size;
        const selectedSize = size || 'Único';

        const product = await Product.findById(productId);
        if (product) {
            let cart = req.session.cart ? Object.assign(new Cart(), req.session.cart) : new Cart();
            cart.addProduct(product, 1, selectedSize);
            req.session.cart = cart;
            res.redirect('/cart');
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.error("Erro em postCart:", err);
        next(err);
    }
};

exports.getCart = (req, res, next) => {
    const sessionCart = req.session.cart;
    const cart = sessionCart ? Object.assign(new Cart(), sessionCart) : new Cart();
    res.render('cart', {
        pageTitle: 'SSERAFIM - Seu Carrinho',
        path: '/cart',
        cart: cart.getCart()
    });
};

exports.postCartUpdateItem = (req, res, next) => {
    const { productId, size, quantity } = req.body;
    const newQuantity = parseInt(quantity);

    if (isNaN(newQuantity) || newQuantity < 0) {
        return res.redirect('/cart');
    }

    let cart = req.session.cart ? Object.assign(new Cart(), req.session.cart) : new Cart();
    if (newQuantity === 0) {
        cart.deleteProduct(productId, size);
    } else {
        cart.updateProductQuantity(productId, size, newQuantity);
    }
    req.session.cart = cart;
    res.redirect('/cart');
};

exports.postCartDeleteItem = (req, res, next) => {
    const { productId, size } = req.body;
    let cart = req.session.cart ? Object.assign(new Cart(), req.session.cart) : new Cart();
    cart.deleteProduct(productId, size);
    req.session.cart = cart;
    res.redirect('/cart');
};

// OUTRAS FUNÇÕES - CORRIGIDAS

exports.getSearch = async (req, res, next) => {
    try {
        const searchQuery = req.query.query.toLowerCase();
        const products = await Product.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        res.render('search-results', {
            pageTitle: 'SSERAFIM - Resultados da Busca',
            path: '/search',
            searchQuery: req.query.query,
            products: products
        });
    } catch (err) {
        console.error("Erro em getSearch:", err);
        next(err);
    }
};

exports.getCheckout = (req, res, next) => {
    res.render('checkout', { pageTitle: 'Checkout', path: '/checkout' });
};

exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: 'Login', path: '/login' });
};
