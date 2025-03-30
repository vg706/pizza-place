// Configuração do Parse
Parse.initialize("HOa7pu3hNfi3xCUSkKzclVZl4XtxwHjlb5odaGdO", "xwV9q0OLSs0fIKYJqqUJsHPrNqPLVsSLAB0DkoZc");
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

// Funções para Registro de Pedidos
async function registrarPedido(clienteId, itens, valorTotal, endereco) {
    try {
        const Pedido = Parse.Object.extend('Pedido');
        const novoPedido = new Pedido();
        
        // Referência ao cliente
        const Cliente = Parse.Object.extend('Cliente');
        const cliente = new Cliente();
        cliente.id = clienteId;
        
        novoPedido.set('clienteId', cliente);
        novoPedido.set('itens', itens);
        novoPedido.set('valorTotal', valorTotal);
        novoPedido.set('status', 'Pendente'); // Status inicial
        novoPedido.set('endereco', endereco);
        novoPedido.set('dataPedido', new Date());
        
        const pedidoSalvo = await novoPedido.save();
        console.log('Pedido registrado com sucesso');
        return pedidoSalvo;
    } catch (error) {
        console.error('Erro no registro de pedido:', error);
        throw error;
    }
}

// Buscar pedidos de um cliente
async function buscarPedidosCliente(clienteId) {
    try {
        const Pedido = Parse.Object.extend('Pedido');
        const query = new Parse.Query(Pedido);
        
        // Referência ao cliente
        const Cliente = Parse.Object.extend('Cliente');
        const cliente = new Cliente();
        cliente.id = clienteId;
        
        query.equalTo('clienteId', cliente);
        query.descending('dataPedido'); // Ordena do mais recente para o mais antigo
        
        const pedidos = await query.find();
        console.log(`Encontrados ${pedidos.length} pedidos`);
        return pedidos;
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
    }
}

// Atualizar status do pedido
async function atualizarStatusPedido(pedidoId, novoStatus) {
    try {
        const Pedido = Parse.Object.extend('Pedido');
        const query = new Parse.Query(Pedido);
        
        const pedido = await query.get(pedidoId);
        pedido.set('status', novoStatus);
        
        const pedidoAtualizado = await pedido.save();
        console.log(`Status do pedido atualizado para: ${novoStatus}`);
        return pedidoAtualizado;
    } catch (error) {
        console.error('Erro ao atualizar status do pedido:', error);
        throw error;
    }
}

// Event Listener para registro de pedido
document.getElementById('registrarPedidoBtn').addEventListener('click', async () => {
    const clienteId = document.getElementById('clienteId').value;
    
    // Exemplo de itens
    const itens = [
        { id: 'prod1', nome: 'Pizza Calabresa', quantidade: 1, preco: 45.90 },
        { id: 'prod2', nome: 'Refrigerante 2L', quantidade: 1, preco: 12.00 }
    ];
    
    const valorTotal = itens.reduce((total, item) => total + (item.quantidade * item.preco), 0);
    const endereco = document.getElementById('endereco').value;
    
    try {
        const pedido = await registrarPedido(clienteId, itens, valorTotal, endereco);
        alert('Pedido registrado com sucesso! ID: ' + pedido.id);
        // Limpar formulário ou redirecionar
    } catch (error) {
        alert('Erro ao registrar pedido: ' + error.message);
    }
});

// Event Listener para listar pedidos de um cliente
document.getElementById('listarPedidosBtn').addEventListener('click', async () => {
    const clienteId = document.getElementById('clienteIdBusca').value;
    
    try {
        const pedidos = await buscarPedidosCliente(clienteId);
        const listaPedidos = document.getElementById('listaPedidos');
        listaPedidos.innerHTML = '';
        
        pedidos.forEach(pedido => {
            const li = document.createElement('li');
            li.textContent = `Pedido #${pedido.id} - Status: ${pedido.get('status')} - Valor: R$ ${pedido.get('valorTotal').toFixed(2)}`;
            
            // Adicionar botões para atualizar status
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
