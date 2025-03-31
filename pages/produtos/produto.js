// Produto.js
// import { parseConfig } from '../parseConfig.js';

// parseConfig();
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
            const div = document.createElement("div");
            div.textContent = `${element.get("nomeProduto")}`;
            listaPizzas.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        throw error;
    }
};

async function listarBebidas() {
    try {
        const Bebida = Parse.Object.extend("Bebida");
        const query = new Parse.Query(Bebida);
        const bebidas = await query.find();

        bebidas.forEach((element) => {
            const div = document.createElement("div");
            div.textContent = `${element.get("nomeBebida")}`;
            listaBebidas.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao listar bebidas:', error);
        throw error;
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