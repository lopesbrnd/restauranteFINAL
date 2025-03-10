var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
import pool from './db.js';
dotenv.config();
export function getClientes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute('SELECT * FROM cliente');
            return rows;
        }
        catch (error) {
            console.error('Erro ao obter clientes:', error);
            throw new Error('Erro ao obter dados dos clientes');
        }
    });
}
export function criarCliente(nome, numero) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verifique se algum valor é inválido antes de tentar inserir no banco
        if (!nome || !numero) {
            throw new Error('Campos obrigatórios não preenchidos');
        }
        try {
            const [result] = yield pool.execute('INSERT INTO cliente (nome, numero) VALUES (?, ?)', [nome, numero]);
            const insertId = result.insertId;
            return { insertId };
        }
        catch (error) {
            console.error('Erro ao criar cliente:', error);
            throw new Error('Erro ao inserir dados do cliente');
        }
    });
}
export function excluirCliente(id_cliente) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield pool.execute('DELETE FROM cliente WHERE id_cliente = ?', [id_cliente]);
            return result.affectedRows > 0;
        }
        catch (error) {
            console.error('Erro ao excluir cliente:', error);
            throw new Error('Erro ao excluir o cliente');
        }
    });
}
