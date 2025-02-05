class Pessoa {
    constructor(id = 0){
        this.id = id
        this.nome = ""
        this.telefone = ""
        this.endereco = ""
        this.notas = []
    }

    media(){
        return this.notas.reduce((acumulador, numero) => acumulador + numero, 0) / this.notas.length;
    }

    situacao() {
        if(this.media() >= 7){
            return "Aprovado"
        }
        else if (this.media() >= 5){
            return "Recuperação"
        }
        else {
            return "Reprovado"
        }
    }
}

class PessoaFisica {
    constructor(){
        this.cpf = ""
    }
}



const camila = new Pessoa();
camila.nome = "Camila";
camila.notas = [8,7,9,3];

console.log(camila.nome)
console.log(camila.notas)
console.log(camila.media())
console.log(camila.situacao())


const fonseca = new Pessoa(2);
fonseca.nome = "Fonseca";
fonseca.notas = [1,8,9,10];

console.log(fonseca.nome)
console.log(fonseca.notas)
console.log(fonseca.media())
console.log(fonseca.situacao())

console.log(camila);
console.log(fonseca);