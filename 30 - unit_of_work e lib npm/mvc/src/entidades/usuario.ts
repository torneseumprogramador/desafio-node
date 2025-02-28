export class Usuario {
    id?: number;
    nome: string;
    endereco?: string;
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
}