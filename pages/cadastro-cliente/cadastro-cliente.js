import { parseConfig } from '../../parseConfig';

parseConfig();

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
