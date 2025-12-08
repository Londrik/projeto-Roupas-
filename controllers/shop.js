
const Product = require('../models/product');
const Cart = require('../models/cart');

// FUNÇÕES DE RENDERIZAÇÃO DE PÁGINA

exports.getIndex = (req, res, next) => {
    Product.find(products => {
        res.render('index', {
            pageTitle: 'SSERAFIM - Início',
            path: '/',
            products: products
        });
    });
};

exports.getProducts = (req, res, next) => {
    Product.find(products => {
        res.render('shop/product-list', {
            pageTitle: 'SSERAFIM - Todos os Produtos',
            path: '/products',
            products: products
        });
    });
};

// NOVA FUNÇÃO PARA FILTRAR PRODUTOS POR CATEGORIA
exports.getCategoryProducts = (req, res, next) => {
    const categoryName = req.params.categoryName;
    Product.find(products => {
        const filteredProducts = products.filter(p => p.categorySlug === categoryName);
        
        // Capitaliza a primeira letra para o título da página
        const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace(/-/g, ' ');

        res.render('shop/product-list', {
            pageTitle: `SSERAFIM - ${pageTitle}`,
            path: '/products', // Mantém a aba "Produtos" ativa no menu
            products: filteredProducts
        });
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Produto Não Encontrado', path: '/404' });
        }
        res.render('product-detail', {
            pageTitle: `SSERAFIM - ${product.name}`,
            product: product,
            path: '/products'
        });
    });
};

// LÓGICA DO CARRINHO

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    const size = req.body.size;
    const selectedSize = size || 'Único';

    Product.findById(productId, product => {
        if (product) {
            let cart = req.session.cart ? Object.assign(new Cart(), req.session.cart) : new Cart();
            cart.addProduct(product, 1, selectedSize);
            req.session.cart = cart;
            res.redirect('/cart');
        } else {
            res.redirect('/');
        }
    });
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

// OUTRAS FUNÇÕES

exports.getSearch = (req, res, next) => {
    const searchQuery = req.query.query.toLowerCase();
    Product.find(products => {
        const filteredProducts = products.filter(p => 
            p.name.toLowerCase().includes(searchQuery) || 
            p.description.toLowerCase().includes(searchQuery)
        );
        res.render('search-results', {
            pageTitle: 'SSERAFIM - Resultados da Busca',
            path: '/search',
            searchQuery: req.query.query,
            products: filteredProducts
        });
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('checkout', { pageTitle: 'Checkout', path: '/checkout' });
};

exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: 'Login', path: '/login' });
};
