const listaDePessoas = [
    { id: 1, nome: "Graziela", telefone: "(11) 99992-99843" },
    { id: 2, nome: "Leandro", telefone: "(11) 29992-99843" },
    { id: 3, nome: "Camila", telefone: "(11) 32332-99843" }
] // Lista de objeto literal

const nomeLeandro = listaDePessoas[1].nome
const telefoneCamila = listaDePessoas[2].telefone

console.log(nomeLeandro)
console.log(telefoneCamila)


let pessoa = {
    id: 1,
    nome: "Graziela",
    telefone: "(11) 99992-99843"
}

console.log(pessoa.id)
console.log(pessoa["id"])

console.log(pessoa.nome)
console.log(pessoa["telefone"])

for (let chave in pessoa) {
    console.log(`${chave}: ${pessoa[chave]}`);
}