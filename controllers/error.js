// Exporta a função get404 para ser usada como um middleware de erro.
exports.get404 = (req, res, next) => {
    // Define o status da resposta como 404 (Não Encontrado).
    res.status(404).render('404', {
        // Renderiza o template '404.ejs'
        // e passa o título da página para o template.
        pageTitle: 'Página Não Encontrada'
    });
};