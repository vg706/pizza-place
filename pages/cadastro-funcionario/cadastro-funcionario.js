// import { parseConfig } from '../../parseConfig';

// parseConfig();
Parse.initialize("HOa7pu3hNfi3xCUSkKzclVZl4XtxwHjlb5odaGdO", "xwV9q0OLSs0fIKYJqqUJsHPrNqPLVsSLAB0DkoZc");
Parse.serverURL = 'https://parseapi.back4app.com';


async function registrarFuncionario(nome, email, senha) {
    const Funcionario = Parse.Object.extend("Funcionario");
    const novoFuncionario = new Funcionario();

    novoFuncionario.set('Nome', nome);
    novoFuncionario.set('Email', email);
    novoFuncionario.set('Senha', senha);
        
    try {
        await novoFuncionario.save();
        console.log('Cliente registrado com sucesso');
        
        return novoFuncionario;
        window.location.href = '../login-funcionario/index.html';
    } catch (error) {
        console.error('Erro no registro de cliente:', error);
        throw error;
    }
    
};
const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();
    var nomeFuncionario = document.getElementById("nome-funcionario").value.trim();
    var emailFuncionario = document.getElementById("email-funcionario").value.trim();
    var senhaFuncionario = document.getElementById("senha-funcionario").value.trim();
    if (!nomeFuncionario || !emailFuncionario || !senhaFuncionario) {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    registrarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario);
});


