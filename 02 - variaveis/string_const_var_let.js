// Utilzando var, ou não, posso redeclarar a variável
nome = "Desafio de node"
var nome  = "Danilo"

global.nome = "Danilo"

const TESTE = "123456"

console.log(global.nome)

const teste = () => {
    console.log(global.nome)

    // Utilzando let, não posso redeclarar a variável, dentro do escopo, porém posso mudar o seu conteúdo
    let nome = "Danilo"
    nome = "jose"

    console.log(nome)
}

// Utilzando const, não posso redeclarar a variável, dentro do escopo e também não porém posso mudar o seu conteúdo
const nome3 = "Danilo"
// nome3 = "José"


teste();


let sobrenome = "Santos"

console.log(nome + " " + sobrenome) // concatenar as variáveis