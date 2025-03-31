// import { parseConfig } from '../../parseConfig.js';

// parseConfig();

Parse.initialize("HOa7pu3hNfi3xCUSkKzclVZl4XtxwHjlb5odaGdO", "xwV9q0OLSs0fIKYJqqUJsHPrNqPLVsSLAB0DkoZc");
Parse.serverURL = 'https://parseapi.back4app.com';

const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", loginFuncionario);

async function loginFuncionario() {
    var emailFuncionario = document.getElementById("email-funcionario").value;
    var senhaFuncionario = document.getElementById("senha-funcionario").value;
    
    try {
        const Funcionario = Parse.Object.extend('Funcionario');
        const query = new Parse.Query(Funcionario);
        query.equalTo('Email', emailFuncionario.trim());
        
        //Verificando email
        const funcionario = await query.first();
        if (!funcionario) {
            console.error("Funcionário não encontrado.");
            alert("Email não cadastrado.");
            return;
        }

        console.log("Cliente encontrado:", funcionario.get('Email'));

        // Verificando a senha
        if (funcionario.get('Senha') !== senhaFuncionario) {
            console.error("Senha incorreta.");
            alert("Senha incorreta.");
            return;
        }
        console.log('Login de Funcionário bem-sucedido');
        window.location.href = '../pedidos-registro/index.html';
    } catch (error) {
        console.error('Erro no login de cliente:', error);
        throw error;
    }
};