// import { parseConfig } from '../../parseConfig';

// parseConfig();
Parse.initialize("HOa7pu3hNfi3xCUSkKzclVZl4XtxwHjlb5odaGdO", "xwV9q0OLSs0fIKYJqqUJsHPrNqPLVsSLAB0DkoZc");
Parse.serverURL = 'https://parseapi.back4app.com';


async function registrarCliente(nome, email, senha) {
    const Cliente = Parse.Object.extend("Cliente");
    const novoCliente = new Cliente();

    novoCliente.set('Nome', nome);
    novoCliente.set('Email', email);
    novoCliente.set('Senha', senha);
        
    try {
        await novoCliente.save();
        console.log('Cliente registrado com sucesso');
        window.location.href = '../login-cliente/index.html';
        return novoCliente;
    } catch (error) {
        console.error('Erro no registro de cliente:', error);
        throw error;
    }
    
};
const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();
    var nomeCliente = document.getElementById("nome-usuario").value;
    var emailCliente = document.getElementById("email-usuario").value;
    var senhaCliente = document.getElementById("senha-usuario").value;
    registrarCliente(nomeCliente, emailCliente, senhaCliente);
});


