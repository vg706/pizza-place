// Eventos.js
import { loginFuncionario, registrarFuncionario } from './funcionario';
import { loginCliente, registrarCliente } from './cliente';
import { registrarPedido, buscarPedidosCliente, atualizarStatusPedido } from './pedido';
import { registrarProduto, listarProdutos, atualizarQuantidadeProduto } from './produto';

document.addEventListener('DOMContentLoaded', () => {
    // Login de Funcionário
    document.getElementById('loginFuncionarioBtn')?.addEventListener('click', async () => {
        const email = document.getElementById('emailFuncionario').value;
        const senha = document.getElementById('senhaFuncionario').value;
        
        try {
            const funcionario = await loginFuncionario(email, senha);
            alert('Login de funcionário bem-sucedido!');
        } catch (error) {
            alert('Erro no login: ' + error.message);
        }
    });

    // Registro de Funcionário
    document.getElementById('registrarFuncionarioBtn')?.addEventListener('click', async () => {
        const nome = document.getElementById('nomeFuncionario').value;
        const email = document.getElementById('emailFuncionario').value;
        const senha = document.getElementById('senhaFuncionario').value;
        const cargo = document.getElementById('cargoFuncionario').value;
        
        try {
            const funcionario = await registrarFuncionario(nome, email, senha, cargo);
            alert('Funcionário registrado com sucesso!');
            document.getElementById('formFuncionario').reset();
        } catch (error) {
            alert('Erro ao registrar funcionário: ' + error.message);
        }
    });

    // Login de Cliente
    document.getElementById('loginClienteBtn')?.addEventListener('click', async () => {
        const email = document.getElementById('emailCliente').value;
        const senha = document.getElementById('senhaCliente').value;
        
        try {
            const cliente = await loginCliente(email, senha);
            alert('Login de cliente bem-sucedido!');
        } catch (error) {
            alert('Erro no login: ' + error.message);
        }
    });

    // Registro de Cliente
    document.getElementById('registrarClienteBtn')?.addEventListener('click', async () => {
        const nome = document.getElementById('nomeCliente').value;
        const email = document.getElementById('emailCliente').value;
        const senha = document.getElementById('senhaCliente').value;
        const telefone = document.getElementById('telefoneCliente').value;
        
        try {
            const cliente = await registrarCliente(nome, email, senha, telefone);
            alert('Cliente registrado com sucesso!');
            document.getElementById('formCliente').reset();
        } catch (error) {
            alert('Erro ao registrar cliente: ' + error.message);
        }
    });

    // Registro de Pedido
    document.getElementById('registrarPedidoBtn')?.addEventListener('click', async () => {
        const clienteId = document.getElementById('clienteId').value;
        const itens = [
            { id: 'prod1', nome: 'Pizza Calabresa', quantidade: 1, preco: 45.90 },
            { id: 'prod2', nome: 'Refrigerante 2L', quantidade: 1, preco: 12.00 }
        ];
        const valorTotal = itens.reduce((total, item) => total + (item.quantidade * item.preco), 0);
        const endereco = document.getElementById('endereco').value;
        
        try {
            const pedido = await registrarPedido(clienteId, itens, valorTotal, endereco);
            alert('Pedido registrado com sucesso! ID: ' + pedido.id);
            document.getElementById('formPedido').reset();
        } catch (error) {
            alert('Erro ao registrar pedido: ' + error.message);
        }
    });

    // Listar Pedidos de Cliente
    document.getElementById('listarPedidosBtn')?.addEventListener('click', async () => {
        const clienteId = document.getElementById('clienteIdBusca').value;
        
        try {
            const pedidos = await buscarPedidosCliente(clienteId);
            const listaPedidos = document.getElementById('listaPedidos');
            listaPedidos.innerHTML = '';
            
            pedidos.forEach(pedido => {
                const li = document.createElement('li');
                li.textContent = `Pedido #${pedido.id} - Status: ${pedido.get('status')} - Valor: R$ ${pedido.get('valorTotal').toFixed(2)}`;
                
                // Botões para atualizar status
                const btnPreparando = document.createElement('button');
                btnPreparando.textContent = 'Em Preparo';
                btnPreparando.onclick = () => atualizarStatusPedido(pedido.id, 'Em preparo');
                
                const btnEntrega = document.createElement('button');
                btnEntrega.textContent = 'Em Entrega';
                btnEntrega.onclick = () => atualizarStatusPedido(pedido.id, 'Em entrega');
                
                const btnEntregue = document.createElement('button');
                btnEntregue.textContent = 'Entregue';
                btnEntregue.onclick = () => atualizarStatusPedido(pedido.id, 'Entregue');
                
                li.appendChild(btnPreparando);
                li.appendChild(btnEntrega);
                li.appendChild(btnEntregue);
                
                listaPedidos.appendChild(li);
            });
        } catch (error) {
            alert('Erro ao listar pedidos: ' + error.message);
        }
    });

    // Registro de Produto
    document.getElementById('registrarProdutoBtn')?.addEventListener('click', async () => {
        const nome = document.getElementById('nomeProduto').value;
        const preco = parseFloat(document.getElementById('precoProduto').value);
        const quantidade = parseInt(document.getElementById('quantidadeProduto').value);
        
        try {
            const produto = await registrarProduto(nome, preco, quantidade);
            alert('Produto registrado com sucesso!');
            document.getElementById('formProduto').reset();
            atualizarListaProdutos();
        } catch (error) {
            alert('Erro ao registrar produto: ' + error.message);
        }
    });

    // Listar Produtos
    document.getElementById('listarProdutosBtn')?.addEventListener('click', async () => {
        atualizarListaProdutos();
    });
});

// Função para atualizar a lista de produtos na interface
async function atualizarListaProdutos() {
    try {
        const produtos = await listarProdutos();
        const listaProdutos = document.getElementById('listaProdutos');
        listaProdutos.innerHTML = '';
        
        produtos.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.get('nome')} - R$ ${produto.get('preco').toFixed(2)} - Estoque: ${produto.get('quantidade')} - ${produto.get('disponivel') ? 'Disponível' : 'Indisponível'}`;
            listaProdutos.appendChild(li);
        });
    } catch (error) {
        alert('Erro ao listar produtos: ' + error.message);
    }
}
