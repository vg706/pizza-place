// Cliente.js
import { parseConfig } from './parseConfig';

parseConfig();

export const loginCliente = async (email, senha) => {
    try {
        const Cliente = Parse.Object.extend('Cliente');
        const query = new Parse.Query(Cliente);
        query.equalTo('email', email);
        
        const cliente = await query.first();
        
        if (!cliente || cliente.get('senha') !== senha) {
            throw new Error('Credenciais inválidas');
        }
        
        console.log('Login de Cliente bem-sucedido');
        return cliente;
    } catch (error) {
        console.error('Erro no login de cliente:', error);
        throw error;
    }
};

export const registrarCliente = async (nome, email, senha, telefone) => {
    try {
        const Cliente = Parse.Object.extend('Cliente');
        const novoCliente = new Cliente();
        
        novoCliente.set('nome', nome);
        novoCliente.set('email', email);
        novoCliente.set('senha', senha); 
        novoCliente.set('telefone', telefone);
        
        const clienteSalvo = await novoCliente.save();
        console.log('Cliente registrado com sucesso');
        return clienteSalvo;
    } catch (error) {
        console.error('Erro no registro de cliente:', error);
        throw error;
    }
};
