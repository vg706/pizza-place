// Pedido.js
import { parseConfig } from '../../parseConfig';

parseConfig();

export const registrarPedido = async (clienteId, itens, valorTotal, endereco) => {
    try {
        const Pedido = Parse.Object.extend('Pedido');
        const novoPedido = new Pedido();
        
        const Cliente = Parse.Object.extend('Cliente');
        const cliente = new Cliente();
        cliente.id = clienteId;
        
        novoPedido.set('clienteId', cliente);
        novoPedido.set('itens', itens);
        novoPedido.set('valorTotal', valorTotal);
        novoPedido.set('status', 'Pendente');
        novoPedido.set('endereco', endereco);
        novoPedido.set('dataPedido', new Date());
        
        const pedidoSalvo = await novoPedido.save();
        console.log('Pedido registrado com sucesso');
        return pedidoSalvo;
    } catch (error) {
        console.error('Erro no registro de pedido:', error);
        throw error;
    }
};

export const buscarPedidosCliente = async (clienteId) => {
    try {
        const Pedido = Parse.Object.extend('Pedido');
        const query = new Parse.Query(Pedido);
        
        const Cliente = Parse.Object.extend('Cliente');
        const cliente = new Cliente();
        cliente.id = clienteId;
        
        query.equalTo('clienteId', cliente);
        query.descending('dataPedido');
        
        const pedidos = await query.find();
        console.log(`Encontrados ${pedidos.length} pedidos`);
        return pedidos;
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
    }
};

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
