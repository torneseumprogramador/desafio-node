import { prisma } from "../config/database";

export class Usuario {
    id?: number;
    nome: string;
    endereco: string;
    email: string;
    senha: string;
    createdAt?: Date;

    constructor(nome?: string, endereco?: string, email?: string, senha?: string, id?: number, createdAt?: Date) {
        this.id = id;
        this.nome = nome || "";
        this.endereco = endereco || "";
        this.email = email || "";
        this.senha = senha || "";
        this.createdAt = createdAt;
    }

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
            data: usuarios.map(u => new Usuario(u.nome, u.endereco, u.email, u.senha, u.id, u.createdAt)),
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
        return usuario ? new Usuario(usuario.nome, usuario.endereco, usuario.email, usuario.senha, usuario.id, usuario.createdAt) : null;
    }

    async salvar(): Promise<Usuario> {
        const usuarioCriado = await prisma.usuario.create({
            data: {
                nome: this.nome,
                endereco: this.endereco,
                email: this.email,
                senha: this.senha
            }
        });
        return new Usuario(usuarioCriado.nome, usuarioCriado.endereco, usuarioCriado.email, usuarioCriado.senha, usuarioCriado.id, usuarioCriado.createdAt);
    }

    async atualizar(): Promise<Usuario> {
        if(! this.id || this.id < 1)
            throw "Id obrigatório para alteração";

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                endereco: this.endereco,
                email: this.email,
                senha: this.senha
            }
        });
        
        return new Usuario(usuarioAtualizado.nome, usuarioAtualizado.endereco, usuarioAtualizado.email, usuarioAtualizado.senha, usuarioAtualizado.id, usuarioAtualizado.createdAt);
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
