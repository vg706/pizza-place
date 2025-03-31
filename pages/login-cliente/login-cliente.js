// Cliente.js
// import { parseConfig } from '../../parseConfig';

// parseConfig();
Parse.initialize("HOa7pu3hNfi3xCUSkKzclVZl4XtxwHjlb5odaGdO", "xwV9q0OLSs0fIKYJqqUJsHPrNqPLVsSLAB0DkoZc");
Parse.serverURL = 'https://parseapi.back4app.com';

const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", loginCliente);

async function loginCliente() {
    var emailUsuario = document.getElementById("email-usuario").value;
    var senhaUsuario = document.getElementById("senha-usuario").value;
    
    try {
        const Cliente = Parse.Object.extend('Cliente');
        const query = new Parse.Query(Cliente);
        query.equalTo('Email', emailUsuario.trim());
        
        //Verificando email
        const cliente = await query.first();
        if (!cliente) {
            console.error("Cliente não encontrado.");
            alert("Email não cadastrado.");
            return;
        }

        console.log("Cliente encontrado:", cliente.get('Email'));

        // Verificando a senha
        if (cliente.get('Senha') !== senhaUsuario) {
            console.error("Senha incorreta.");
            alert("Senha incorreta.");
            return;
        }
        console.log('Login de Cliente bem-sucedido');
        window.location.href = '../pedidos-registro/index.html';
    } catch (error) {
        console.error('Erro no login de cliente:', error);
        throw error;
    }
};