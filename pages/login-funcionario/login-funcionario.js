import { parseConfig } from '../../parseConfig.js';

parseConfig();

export const loginFuncionario = async (email, senha) => {
    try {
        const Funcionario = Parse.Object.extend('Funcionario');
        const query = new Parse.Query(Funcionario);
        query.equalTo('email', email);
        
        const funcionario = await query.first();
        
        if (!funcionario || funcionario.get('senha') !== senha) {
            throw new Error('Credenciais inválidas');
        }
        
        console.log('Login de Funcionário bem-sucedido');
        return funcionario;
    } catch (error) {
        console.error('Erro no login de funcionário:', error);
        throw error;
    }
};
