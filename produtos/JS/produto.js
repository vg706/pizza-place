// Produto.js
import { parseConfig } from './parseConfig';

parseConfig();

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

export const listarProdutos = async () => {
    try {
        const Produto = Parse.Object.extend('Produto');
        const query = new Parse.Query(Produto);
        
        const produtos = await query.find();
        console.log(`Encontrados ${produtos.length} produtos`);
        return produtos;
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
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
