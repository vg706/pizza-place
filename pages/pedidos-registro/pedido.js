// Pedido.js
Parse.initialize("HOa7pu3hNfi3xCUSkKzclVZl4XtxwHjlb5odaGdO", "xwV9q0OLSs0fIKYJqqUJsHPrNqPLVsSLAB0DkoZc");
Parse.serverURL = 'https://parseapi.back4app.com';

const pedidosFeitos = document.getElementById("pedidos-feitos");

async function listarPedidos() {
    const Pedido = Parse.Object.extend("Pedido");
    const query = new Parse.Query(Pedido);

    query.include("nomePizzaPedido");
    query.include("nomeBebidaPedido");

    try {
        const pedidos = await query.find();
        
        if (pedidos.length === 0) {
            const div = document.createElement("div");
            div.className = "col-12";
            div.innerHTML = `
                <div class="card">
                    <div class="card-body text-center">
                        <p>Você ainda não tem pedidos registrados.</p>
                        <a href="../produtos/index.html" class="btn btn-primary">Fazer um pedido</a>
                    </div>
                </div>
            `;
            pedidosFeitos.appendChild(div);
            return;
        }
        
        pedidos.forEach(element => {
            const pizza = element.get("nomePizzaPedido");
            const nomePizza = pizza.get("nomeProduto");
            const valorPizza = pizza.get("precoProduto");

            const bebida = element.get("nomeBebidaPedido");
            const nomeBebida = bebida.get("nomeBebida");
            const valorBebida = bebida.get("valorBebida");
            
            const valorTotal = valorPizza + valorBebida;
            const status = element.get("status") || "Pendente";
            
            // Criar um card para cada pedido
            const div = document.createElement("div");
            div.className = "col";
            div.innerHTML = `
                <div class="card h-100">
                    <div class="card-header ${getStatusClass(status)}">
                        <h5 class="card-title mb-0 text-white">Pedido #${element.id.substring(0, 8)}</h5>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${nomePizza}</h5>
                        <p class="card-text">Pizza: R$ ${valorPizza.toFixed(2)}</p>
                        <h5 class="card-title">${nomeBebida}</h5>
                        <p class="card-text">Bebida: R$ ${valorBebida.toFixed(2)}</p>
                        <hr>
                        <p class="card-text fw-bold">Valor Total: R$ ${valorTotal.toFixed(2)}</p>
                        <p class="card-text">Status: <span class="badge ${getStatusClass(status)}">${status}</span></p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Data do pedido: ${formatarData(element.createdAt)}</small>
                    </div>
                </div>
            `;
            pedidosFeitos.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        const div = document.createElement("div");
        div.className = "col-12";
        div.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Erro ao carregar pedidos. Por favor, tente novamente mais tarde.
            </div>
        `;
        pedidosFeitos.appendChild(div);
    }
};

// Função para obter a classe de cor com base no status
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'pendente':
            return 'bg-warning';
        case 'em preparo':
            return 'bg-info';
        case 'saiu para entrega':
            return 'bg-primary';
        case 'entregue':
            return 'bg-success';
        case 'cancelado':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
}

// Função para formatar a data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export const atualizarStatusPedido = async (pedidoId, novoStatus) => {
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
};

window.onload = function() {
    listarPedidos();
};