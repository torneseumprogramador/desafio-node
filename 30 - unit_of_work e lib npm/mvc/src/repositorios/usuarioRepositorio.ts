import { prisma } from "../config/database";
import { Usuario } from "../entidades/usuario";

export class UsuarioRepositorio {
    static async listarTodos(
        where: any = {},
        page: number = 1,
        perPage: number = 10,
        skip: number = 10
    ) {
        // Obtém o total de usuários com os filtros aplicados
        const totalItems = await prisma.usuario.count({ where });
    
        // Calcula o número total de páginas
        const totalPages = Math.ceil(totalItems / perPage);
    
        // Busca os usuários com os filtros aplicados
        const usuarios = await prisma.usuario.findMany({
            where,
            skip: skip,
            take: perPage,
            orderBy: { createdAt: "desc" },
        });
    
        return {
            data: usuarios.map((u:any) => new Usuario(u.nome, u.endereco || "", u.email, u.senha, u.id, u.createdAt)),
            currentPage: page,
            perPage: perPage,
            totalPages: totalPages,
            totalItems: totalItems
        };
    }

    static async buscarPorId(id: number): Promise<Usuario | null> {
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });
        return usuario ? new Usuario(usuario.nome, usuario.endereco || "", usuario.email, usuario.senha, usuario.id, usuario.createdAt) : null;
    }

    static async buscarPorEmailSenha(email: string, senha: string): Promise<Usuario | null> {
        const usuario = await prisma.usuario.findUnique({
            where: { email, senha }
        });
        return usuario ? new Usuario(usuario.nome, usuario.endereco || "", usuario.email, usuario.senha, usuario.id, usuario.createdAt) : null;
    }

    static async buscarPorEmail(email: string): Promise<Usuario | null> {
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });
        return usuario ? new Usuario(usuario.nome, usuario.endereco || "", usuario.email, usuario.senha, usuario.id, usuario.createdAt) : null;
    }

    static async salvar(usuario: Usuario): Promise<Usuario> {
        const usuarioCriado = await prisma.usuario.create({
            data: {
                nome: usuario.nome,
                endereco: usuario.endereco || "",
                email: usuario.email,
                senha: usuario.senha
            }
        });
        return new Usuario(usuarioCriado.nome, usuarioCriado.endereco || "", usuarioCriado.email, usuarioCriado.senha, usuarioCriado.id, usuarioCriado.createdAt);
    }

    static async atualizar(usuario: Usuario): Promise<Usuario> {
        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                nome: usuario.nome,
                endereco: usuario.endereco,
                email: usuario.email,
                senha: usuario.senha
            }
        });
        
        return new Usuario(usuarioAtualizado.nome, usuarioAtualizado.endereco || "", usuarioAtualizado.email, usuarioAtualizado.senha, usuarioAtualizado.id, usuarioAtualizado.createdAt);
    }

    static async quantidade(): Promise<number> {
        return await prisma.usuario.count()
    }

    static async deletar(id: number): Promise<void> {
        await prisma.usuario.delete({
            where: { id }
        });
    }
}
