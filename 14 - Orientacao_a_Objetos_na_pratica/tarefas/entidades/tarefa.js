class Tarefa {
    constructor(objeto_literal = {}){
        this.id = objeto_literal.id
        this.titulo = objeto_literal.titulo
        this.descricao = objeto_literal.descricao
        this.status = objeto_literal.status
    }
}

module.exports = Tarefa;