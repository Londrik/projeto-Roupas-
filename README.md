# Projeto Node.js com Express

Este é um projeto de um servidor web simples construído com Node.js e o framework Express. Ele serve uma página da web e também expõe um endpoint de API JSON de exemplo.

## Visão Geral do Projeto

O servidor está configurado para usar o EJS como motor de templates, servir arquivos estáticos da pasta `public` e lidar com rotas básicas e erros 404.

## Estrutura do Projeto

```
/
|-- controllers/
|   |-- error.js        # Controlador para lidar com a página de erro 404
|   `-- shop.js         # Controlador para a lógica da página inicial
|-- public/
|   `-- styles.css      # Arquivos de estilo CSS
|-- routes/
|   `-- shop.js         # Define as rotas para a página principal
|-- views/
|   |-- 404.ejs         # Template para a página de erro 404
|   `-- index.ejs       # Template para a página inicial
|-- .gitignore          # Arquivos e pastas a serem ignorados pelo Git
|-- index.js            # Ponto de entrada principal da aplicação
|-- package-lock.json   # Gerado pelo npm, descreve a árvore de dependências exata
|-- package.json        # Define os metadados do projeto e as dependências
`-- README.md           # Este arquivo de documentação
```

### Descrição dos Arquivos e Pastas

- **`index.js`**: Este é o coração da sua aplicação. Ele inicializa o servidor Express, configura o middleware, define o motor de visualização (EJS) e conecta as rotas.
- **`controllers/`**: Esta pasta contém a lógica de negócios da sua aplicação. Os controladores são responsáveis por processar as solicitações recebidas, interagir com os dados (se houver) e enviar uma resposta.
- **`routes/`**: Aqui você define os endpoints da sua API ou as rotas do seu site. Cada arquivo de rota agrupa rotas relacionadas.
- **`views/`**: Contém os arquivos de template (neste caso, EJS). O Express renderizará esses arquivos e os enviará como HTML para o navegador.
- **`public/`**: Uma pasta para todos os seus arquivos estáticos, como CSS, imagens e JavaScript do lado do cliente. Os arquivos nesta pasta são servidos diretamente pelo Express.
- **`package.json`**: Este arquivo gerencia as dependências do seu projeto (pacotes npm) e os scripts que podem ser executados (como `npm start`).

## Como Começar

Siga estas instruções para obter uma cópia do projeto em funcionamento na sua máquina local para desenvolvimento e teste.

### Pré-requisitos

Você precisa ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) (que vem com o Node.js) instalados em sua máquina.
b
### Instalação

1.  Clone este repositório (ou baixe os arquivos).
2.  Abra o terminal na pasta raiz do projeto.
3.  Instale as dependências do projeto executando:

    ```bash
    npm install
    ```

## Scripts Disponíveis

Na pasta do projeto, você pode executar:

### `npm start`

Executa a aplicação em modo de produção. O servidor será iniciado e você poderá acessá-lo em `http://localhost:8080` (ou a porta definida).

### `npm run dev`

Executa a aplicação em modo de desenvolvimento usando o `nodemon`. O `nodemon` reiniciará automaticamente o servidor sempre que detectar uma alteração nos arquivos do projeto. Isso é muOq falta fazer agora


ito útil durante o desenvolvimento para que você não precise reiniciar o servidor manualmente a cada mudança.

## Documentação da API

O projeto inclui um endpoint de API de exemplo para demonstrar a funcionalidade básica.

### GET /api

Retorna uma mensagem "Olá mundo" em formato JSON.

- **URL:** `/api`
- **Método:** `GET`
- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Conteúdo:**
    ```json
    {
      "msg": "Olá mundo"
    }
    ```

**Exemplo de uso com `curl`:**

```bash
curl http://localhost:3000
```
