// Exporta a função getIndex para que ela possa ser usada em outros arquivos (neste caso, nas rotas).
exports.getIndex = (req, res, next) => {
    // Renderiza o template 'index.ejs' da pasta de views.
    res.render('index', {
        // Passa dados para o template.
        // pageTitle será o título da página.
        pageTitle: 'Site de Roupas',
        // path é usado para destacar o link ativo na navegação.
        path: '/'
    });
};