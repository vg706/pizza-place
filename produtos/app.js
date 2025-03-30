// Configuração do Parse (mantenha o que já existe)
Parse.initialize("SEU_APP_ID", "SEU_JS_KEY");
Parse.serverURL = 'https://parseapi.back4app.com';

// Função de Login de Funcionário
async function loginFuncionario(email, senha) {
    try {
        const Funcionario = Parse.Object.extend('Funcionario');
        const query = new Parse.Query(Funcionario);
        query.equalTo('email', email);
        
        const funcionario = await query.first();
        
        if (!funcionario) {
            throw new Error('Funcionário não encontrado');
        }
        
        if (funcionario.get('senha') !== senha) {
            throw new Error('Senha incorreta');
        }
        
        console.log('Login de Funcionário bem-sucedido');
        return funcionario;
    } catch (error) {
        console.error('Erro no login de funcionário:', error);
        throw error;
    }
}

// Função de Registro de Funcionário
async function registrarFuncionario(nome, email, senha, cargo) {
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
}

// Event Listener para login de funcionário
document.getElementById('loginFuncionarioBtn').addEventListener('click', async () => {
    const email = document.getElementById('emailFuncionario').value;
    const senha = document.getElementById('senhaFuncionario').value;
    
    try {
        const funcionario = await loginFuncionario(email, senha);
        // Redirecionar ou mostrar painel do funcionário
        alert('Login de funcionário bem-sucedido!');
    } catch (error) {
        // Mostrar mensagem de erro
        alert('Erro no login: ' + error.message);
    }
});