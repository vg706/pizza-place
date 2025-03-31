import { parseConfig } from '../../parseConfig.js';

parseConfig();

export const registrarFuncionario = async (nome, email, senha, cargo) => {
    try {
        const Funcionario = Parse.Object.extend('Funcionario');
        const novoFuncionario = new Funcionario();
        
        novoFuncionario.set('nome', nome);
        novoFuncionario.set('email', email);
        novoFuncionario.set('senha', senha); 
        novoFuncionario.set('cargo', cargo);
        
        const funcionarioSalvo = await novoFuncionario.save();
        console.log('Funcionário registrado com sucesso');
        return funcionarioSalvo;
    } catch (error) {
        console.error('Erro no registro de funcionário:', error);
        throw error;
    }
};
