export class Tarefa {
    public id: number;
    public titulo: string;
    public descricao: string;
    public status: string;

    constructor(objeto_literal:any = {}){
        this.id = objeto_literal.id
        this.titulo = objeto_literal.titulo
        this.descricao = objeto_literal.descricao
        this.status = objeto_literal.status
    }
}