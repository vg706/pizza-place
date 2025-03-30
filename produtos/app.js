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

// Função de Login de Cliente
async function loginCliente(email, senha) {
    try {
        const Cliente = Parse.Object.extend('Cliente');
        const query = new Parse.Query(Cliente);
        query.equalTo('email', email);
        
        const cliente = await query.first();
        
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        
        // Aqui você normalmente verificaria a senha de forma segura
        if (cliente.get('senha') !== senha) {
            throw new Error('Senha incorreta');
        }
        
        console.log('Login de Cliente bem-sucedido');
        return cliente;
    } catch (error) {
        console.error('Erro no login de cliente:', error);
        throw error;
    }
}

// Função de Registro de Cliente
async function registrarCliente(nome, email, senha, telefone) {
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
}

// Event Listener para login de cliente
document.getElementById('loginClienteBtn').addEventListener('click', async () => {
    const email = document.getElementById('emailCliente').value;
    const senha = document.getElementById('senhaCliente').value;
    
    try {
        const cliente = await loginCliente(email, senha);
        // Redirecionar ou mostrar painel do cliente
        alert('Login de cliente bem-sucedido!');
    } catch (error) {
        // Mostrar mensagem de erro
        alert('Erro no login: ' + error.message);
    }
});