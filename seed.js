const fs = require('fs').promises;
const path = require('path');

async function seedData() {
    try {
        console.log('Iniciando o processo de seeding...');

        // Os dados originais dos produtos que tínhamos
        const mockProducts = [
            {
                id: 'p1',
                name: 'Bolsa de Couro Essencial',
                price: 'R$ 299,99',
                description: 'Uma bolsa elegante e versátil, feita de couro legítimo. Perfeita para o dia a dia, combinando funcionalidade e estilo. Com compartimentos internos e um design atemporal.',
                imageUrl: 'https://raw.githubusercontent.com/google-gemini/gemini-generative-ai-docs/main/sample_images/Bolsa%20de%20Couro%20Essencial.png',
                categorySlug: 'bolsas-e-acessorios',
                categoryName: 'Bolsas e Acessórios',
                isFeatured: true
            },
            {
                id: 'p2',
                name: 'Jaqueta Bomber Urbana',
                price: 'R$ 449,90',
                description: 'Esta jaqueta bomber é a peça que faltava no seu guarda-roupa. Com um corte moderno e tecido resistente à água, ela é ideal para um look casual e despojado em qualquer estação.',
                imageUrl: 'https://raw.githubusercontent.com/google-gemini/gemini-generative-ai-docs/main/sample_images/Jaqueta%20Bomber%20Urbana.png',
                categorySlug: 'casacos-e-jaquetas',
                categoryName: 'Casacos e Jaquetas',
                isFeatured: true
            },
            {
                id: 'p3',
                name: 'Mala de Viagem Rígida',
                price: 'R$ 799,00',
                description: 'Viaje com segurança e estilo. Esta mala de viagem possui um casco rígido ultra-resistente, 4 rodas com giro 360º e um interior espaçoso para organizar seus pertences.',
                imageUrl: 'https://raw.githubusercontent.com/google-gemini/gemini-generative-ai-docs/main/sample_images/Mala%20de%20Viagem%20R%C3%ADgida.png',
                categorySlug: 'para-viajar',
                categoryName: 'Para Viajar',
                isFeatured: true
            },
        ];

        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, 'products.json');

        // Garante que o diretório 'data' exista
        await fs.mkdir(dataDir, { recursive: true });

        // Escreve os dados mockados no arquivo products.json
        await fs.writeFile(filePath, JSON.stringify(mockProducts, null, 2));

        console.log('Dados mockados de produtos foram escritos em data/products.json com sucesso!');
    } catch (error) {
        console.error('Erro ao executar o script de seed:', error);
        process.exit(1); // Encerra o processo com erro
    }
}

// Executa a função de seeding
seedData();
