function Pessoa(id, nome, telefone) {
    this.id = id
    this.nome = nome
    this.telefone = telefone
    this.endereco = ""
    this.notas = []

    this.media = () => {
        return this.notas.reduce((acumulador, numero) => acumulador + numero, 0) / this.notas.length;
    }

    this.situacao = () => {
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

const camila = new Pessoa();
camila.nome = "Camila";
camila.notas = [8,7,9,3];

console.log(camila.nome)
console.log(camila.notas)
console.log(camila.media())
console.log(camila.situacao())


const fonseca = new Pessoa(1, "Fonseca", "1111111111");
fonseca.notas = [1,8,9,10];

console.log(fonseca.nome)
console.log(fonseca.notas)
console.log(fonseca.media())
console.log(fonseca.situacao())

console.log(camila);
console.log(fonseca);