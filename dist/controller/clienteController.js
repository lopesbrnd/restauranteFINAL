var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as clienteModel from '../models/clienteModel.js';
export function getCliente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cliente = yield clienteModel.getClientes();
            res.json(cliente);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar clientes' });
        }
    });
}
export function criarCliente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, numero } = req.body;
        if (!nome || !numero) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
        }
        try {
            const result = yield clienteModel.criarCliente(nome, numero);
            return res.status(201).json({ id: result.insertId });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro ao criar cliente' });
        }
    });
}
export function excluirCliente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_cliente = parseInt(req.params.id_cliente);
        if (isNaN(id_cliente)) {
            res.status(400).json({ message: 'ID de pedido inválido.' });
            return;
        }
        try {
            const sucesso = yield clienteModel.excluirCliente(id_cliente);
            if (sucesso) {
                res.status(200).json({ message: 'Cliente excluído com sucesso.' });
            }
            else {
                res.status(404).json({ message: 'Cliente não encontrado.' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao excluir cliente.', error });
        }
    });
}
