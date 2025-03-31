// Produto.js
Parse.initialize("HOa7pu3hNfi3xCUSkKzclVZl4XtxwHjlb5odaGdO", "xwV9q0OLSs0fIKYJqqUJsHPrNqPLVsSLAB0DkoZc");
Parse.serverURL = 'https://parseapi.back4app.com';

const listaPizzas = document.getElementById("listaPizzas");
const listaBebidas = document.getElementById("listaBebidas");

export const registrarProduto = async (nome, preco, quantidade) => {
    try {
        const Produto = Parse.Object.extend('Produto');
        const novoProduto = new Produto();
        
        novoProduto.set('nome', nome);
        novoProduto.set('preco', preco);
        novoProduto.set('quantidade', quantidade);
        novoProduto.set('disponivel', quantidade > 0);
        
        const produtoSalvo = await novoProduto.save();
        console.log('Produto registrado com sucesso');
        return produtoSalvo;
    } catch (error) {
        console.error('Erro no registro de produto:', error);
        throw error;
    }
};

async function listarPizzas() {
    try {
        const Pizza = Parse.Object.extend("Produto");
        const query = new Parse.Query(Pizza);
        const pizzas = await query.find();

        pizzas.forEach((element) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            
            const nomePizza = element.get("nomeProduto") || "Pizza sem nome";
            const precoPizza = element.get("precoProduto") || 0;
            
            listItem.innerHTML = `
                <div>
                    <h5 class="mb-1">${nomePizza}</h5>
                    <p class="mb-0">R$ ${precoPizza.toFixed(2)}</p>
                </div>
                <button class="btn btn-sm btn-primary adicionar-pizza" data-id="${element.id}">Adicionar</button>
            `;
            listaPizzas.appendChild(listItem);
        });
        
        // Se não houver pizzas, mostrar mensagem
        if (pizzas.length === 0) {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = "Nenhuma pizza disponível no momento.";
            listaPizzas.appendChild(listItem);
        }
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        const listItem = document.createElement("li");
        listItem.className = "list-group-item text-danger";
        listItem.textContent = "Erro ao carregar pizzas. Por favor, tente novamente mais tarde.";
        listaPizzas.appendChild(listItem);
    }
};

async function listarBebidas() {
    try {
        const Bebida = Parse.Object.extend("Bebida");
        const query = new Parse.Query(Bebida);
        const bebidas = await query.find();

        bebidas.forEach((element) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            
            const nomeBebida = element.get("nomeBebida") || "Bebida sem nome";
            const valorBebida = element.get("valorBebida") || 0;
            
            listItem.innerHTML = `
                <div>
                    <h5 class="mb-1">${nomeBebida}</h5>
                    <p class="mb-0">R$ ${valorBebida.toFixed(2)}</p>
                </div>
                <button class="btn btn-sm btn-primary adicionar-bebida" data-id="${element.id}">Adicionar</button>
            `;
            listaBebidas.appendChild(listItem);
        });
        
        // Se não houver bebidas, mostrar mensagem
        if (bebidas.length === 0) {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = "Nenhuma bebida disponível no momento.";
            listaBebidas.appendChild(listItem);
        }
    } catch (error) {
        console.error('Erro ao listar bebidas:', error);
        const listItem = document.createElement("li");
        listItem.className = "list-group-item text-danger";
        listItem.textContent = "Erro ao carregar bebidas. Por favor, tente novamente mais tarde.";
        listaBebidas.appendChild(listItem);
    }
};

export const atualizarQuantidadeProduto = async (produtoId, novaQuantidade) => {
    try {
        const Produto = Parse.Object.extend('Produto');
        const query = new Parse.Query(Produto);
        
        const produto = await query.get(produtoId);
        produto.set('quantidade', novaQuantidade);
        produto.set('disponivel', novaQuantidade > 0);
        
        const produtoAtualizado = await produto.save();
        console.log(`Quantidade atualizada para: ${novaQuantidade}`);
        return produtoAtualizado;
    } catch (error) {
        console.error('Erro ao atualizar quantidade:', error);
        throw error;
    }
};

window.onload = function() {
    listarPizzas();
    listarBebidas();
};