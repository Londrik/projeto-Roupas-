// Importa o framework Express para criar o servidor web.
const express = require('express');
// Importa o módulo 'path' do Node.js para trabalhar com caminhos de arquivos e diretórios.
const path = require('path');

// Cria uma instância do aplicativo Express.
const app = express();

// Define a porta em que o servidor irá escutar.
// Ele tenta obter a porta da variável de ambiente PORT,
// ou do terceiro argumento da linha de comando, ou usa 8080 como padrão.
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

// Importa as rotas da loja.
const rotasDaLoja = require('./routes/shop');
// Importa o controlador de erros.
const controladorDeErro = require('./controllers/error');

// Configura o middleware para servir arquivos estáticos (CSS, imagens, etc.) da pasta 'public'.
app.use(express.static(path.join(__dirname, 'public')))
  // Define o diretório onde os arquivos de template (views) estão localizados.
  .set('views', path.join(__dirname, 'views'))
  // Define o EJS como o motor de templates a ser usado.
  .set('view engine', 'ejs');

// Usa as rotas da loja no aplicativo.
app.use(rotasDaLoja);

// Adiciona um middleware para tratar erros 404 (página não encontrada).
app.use(controladorDeErro.get404);

// Define uma rota de API de exemplo em '/api'.
app.get('/api', (req, res) => {
  // Responde com um JSON simples.
  res.json({ "msg": "Olá mundo" });
});

// Inicia o servidor e o faz escutar na porta definida.
app.listen(port, () => {
  // Exibe uma mensagem no console informando que o servidor está rodando.
  console.log(`Servidor rodando em http://localhost:${port}`);
})