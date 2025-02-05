const Pessoa = {
    id: 0,
    nome: "",
    telefone: "",
    endereco: "",
    notas: [],

    media: () => {
        return Pessoa.notas.reduce((acumulador, numero) => acumulador + numero, 0) / Pessoa.notas.length;
    },

    situacao: () => {
        if(Pessoa.media() >= 7){
            return "Aprovado"
        }
        else if (Pessoa.media() >= 5){
            return "Recuperação"
        }
        else {
            return "Reprovado"
        }
    }
}

Pessoa.nome = "Camila";
Pessoa.notas = [8,7,9,3];

console.log(Pessoa.nome)
console.log(Pessoa.notas)
console.log(Pessoa.media())
console.log(Pessoa.situacao())


Pessoa.nome = "Foseca";
Pessoa.notas = [8,7,9,3];

console.log(Pessoa.nome)
console.log(Pessoa.notas)
console.log(Pessoa.media())
console.log(Pessoa.situacao())

console.log(Pessoa)
