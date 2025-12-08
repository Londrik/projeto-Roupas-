const fs = require('fs').promises; // Usa a versão baseada em Promises do fs
const path = require('path');

// Caminho mais robusto para o nosso "banco de dados" em arquivo JSON
const p = path.join(
  process.cwd(), // Usar process.cwd() é mais confiável
  'data',
  'products.json'
);

// Função auxiliar para ler os produtos do arquivo (agora retorna uma Promise)
const getProductsFromFile = async () => {
  try {
    const fileContent = await fs.readFile(p, 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    // Se o arquivo não existir ou der erro, retorna um array vazio de forma segura
    console.error("Could not read products file:", err);
    return [];
  }
};

// Modelo de Produto refatorado para usar async/await
module.exports = class Product {

  // Método estático para buscar todos os produtos (retorna uma Promise)
  static async find() {
    return getProductsFromFile();
  }

  // Método estático para buscar um produto pelo ID (retorna uma Promise)
  static async findById(id) {
    const products = await getProductsFromFile();
    // CORREÇÃO: Usa 'p.id' em vez de 'p._id' para corresponder ao JSON
    const product = products.find(p => p.id === id);
    return product || null; // Retorna o produto ou null se não encontrar
  }
  
};
