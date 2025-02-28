import { Usuario } from "../entidades/usuario";
import { UsuarioRepositorio } from "../repositorios/usuarioRepositorio";

export class UsuarioServico {
    static async listarTodos(
        page: number = 1,
        perPage: number = 10,
        nome: string = "",
        dataInicio: string = "",
        dataFim: string = ""
    ) {
        if (page < 1) page = 1;
        const skip = (page - 1) * perPage;
    
        // Montando os filtros dinamicamente
        const where: any = {};
    
        if (nome) {
            where.nome = { contains: nome }; // LIKE %nome%
        }
    
        if (dataInicio && dataFim) {
            where.createdAt = { 
                gte: new Date(`${dataInicio}T00:00:00.000Z`), // Início do dia
                lte: new Date(`${dataFim}T23:59:59.999Z`) // Final do dia
            };
        } else if (dataInicio) {
            where.createdAt = { gte: new Date(`${dataInicio}T00:00:00.000Z`) }; // Início do dia
        } else if (dataFim) {
            where.createdAt = { lte: new Date(`${dataFim}T23:59:59.999Z`) }; // Final do dia
        }

        return await UsuarioRepositorio.listarTodos(where, page, perPage, skip)
    }

    static async buscarPorId(id: number): Promise<Usuario | null> {
        if(!id || Number(id) < 1) throw "Id obrigatório";
        return await UsuarioRepositorio.buscarPorId(id);
    }

    static async buscarPorEmailSenha(email: string, senha: string): Promise<Usuario | null> {
        if(!email) throw "Email obrigatório";
        if(!senha) throw "Senha obrigatória";
        return await UsuarioRepositorio.buscarPorEmailSenha(email, senha);
    }

    static async buscarPorEmail(email: string): Promise<Usuario | null> {
        if(!email) throw "Email obrigatório";
        return await UsuarioRepositorio.buscarPorEmail(email);
    }

    static async salvar(usuario: Usuario): Promise<Usuario> {
        if(!usuario.nome) throw "Nome obrigatório";
        if(!usuario.email) throw "Email obrigatório";
        if(!usuario.senha) throw "Senha obrigatória";

        return await UsuarioRepositorio.salvar(usuario)
    }

    static async atualizar(usuario: Usuario): Promise<Usuario> {
        if(! usuario.id || Number(usuario.id) < 1) throw "Id obrigatório para alteração";
        if(!usuario.nome) throw "Nome obrigatório";
        if(!usuario.email) throw "Email obrigatório";
        if(!usuario.senha) throw "Senha obrigatória";
        return await UsuarioRepositorio.atualizar(usuario)
    }

    static async quantidade(): Promise<number> {
        return await UsuarioRepositorio.quantidade();
    }

    static async deletar(id: number): Promise<void> {
        if(!id || Number(id) < 1) throw "Id obrigatório";
        return await UsuarioRepositorio.deletar(id);
    }
}
