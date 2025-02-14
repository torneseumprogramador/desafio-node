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

    static async listarTodos(): Promise<Usuario[]> {
        const usuarios = await prisma.usuario.findMany();
        return usuarios.map(u => new Usuario(u.nome, u.endereco, u.email, u.senha, u.id, u.createdAt));
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

    static async deletar(id: number): Promise<void> {
        await prisma.usuario.delete({
            where: { id }
        });
    }
}
