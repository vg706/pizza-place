// Pedido.js
// import { parseConfig } from '../../parseConfig';

// parseConfig();
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
        pedidos.forEach(element => {
            const pizza = element.get("nomePizzaPedido");
            const nomePizza = pizza.get("nomeProduto");
            const valorPizza = pizza.get("precoProduto");

            const bebida = element.get("nomeBebidaPedido");
            const nomeBebida = bebida.get("nomeBebida");
            const valorBebida = bebida.get("valorBebida");

            const div = document.createElement("div");
            div.innerHTML = `<h3> ${nomePizza} + ${nomeBebida}</h3><p><h4>Valor: ${valorPizza + valorBebida}</h4></p>`;
            pedidosFeitos.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        throw error;
    }
};
 
// export const registrarPedido = async (clienteId, itens, valorTotal, endereco) => {
//     try {
//         const Pedido = Parse.Object.extend('Pedido');
//         const novoPedido = new Pedido();
        
//         const Cliente = Parse.Object.extend('Cliente');
//         const cliente = new Cliente();
//         cliente.id = clienteId;
        
//         novoPedido.set('clienteId', cliente);
//         novoPedido.set('itens', itens);
//         novoPedido.set('valorTotal', valorTotal);
//         novoPedido.set('status', 'Pendente');
//         novoPedido.set('endereco', endereco);
//         novoPedido.set('dataPedido', new Date());
        
//         const pedidoSalvo = await novoPedido.save();
//         console.log('Pedido registrado com sucesso');
//         return pedidoSalvo;
//     } catch (error) {
//         console.error('Erro no registro de pedido:', error);
//         throw error;
//     }
// };


// export const buscarPedidosCliente = async (clienteId) => {
//     try {
//         const Pedido = Parse.Object.extend('Pedido');
//         const query = new Parse.Query(Pedido);
        
//         const Cliente = Parse.Object.extend('Cliente');
//         const cliente = new Cliente();
//         cliente.id = clienteId;
        
//         query.equalTo('clienteId', cliente);
//         query.descending('dataPedido');
        
//         const pedidos = await query.find();
//         console.log(`Encontrados ${pedidos.length} pedidos`);
//         return pedidos;
//     } catch (error) {
//         console.error('Erro ao buscar pedidos:', error);
//         throw error;
//     }
// };

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