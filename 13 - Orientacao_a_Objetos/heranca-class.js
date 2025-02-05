class Pessoa {
    constructor(id = 0) {
        this.id = id;
        this.nome = "";
        this.telefone = "";
        this.endereco = "";
        this.notas = [];
    }

    media() {
        this.#logCalculoMedia();

        return this.notas.length > 0 
            ? this.#somaDasNotas() / this.notas.length 
            : 0;
    }

    #somaDasNotas() {
        return this.notas.reduce((acumulador, numero) => acumulador + numero, 0);
    }

    #logCalculoMedia() {
        console.log("Notas: ", this.notas);
        console.log("Soma das notas: ", this.#somaDasNotas());
        console.log("Quantidade de notas: ", this.notas.length);
    }

    situacao() {
        const media = this.media();

        if (media >= 7) {
            return "Aprovado";
        } else if (media >= 5) {
            return "Recuperação";
        } else {
            return "Reprovado";
        }
    }

    static mensagem() {
        console.log("=====[é um método statico da classe Pessoa]====");
    }
}

// Aplicando herança com `extends`
class PessoaFisica extends Pessoa {
    constructor(id = 0, cpf = "") {
        super(id); // Chama o construtor da classe Pessoa
        this.cpf = cpf;
    }

    // polimorfismo
    // media(){
    //     return 20;
    // }
}


// Aplicando herança com `extends`
class PessoaJuridica extends Pessoa {
    constructor(id = 0, cnpj = "") {
        super(id); // Chama o construtor da classe Pessoa
        this.cnpj = cnpj;
    }

    // polimorfismo
    // media() {
    //     return 30
    // }
}



// Exemplo de uso
const pessoa1 = new PessoaFisica(1, "123.456.789-00");
pessoa1.nome = "João";
pessoa1.notas = [8, 7, 9];
console.log(pessoa1);
console.log(pessoa1.media());

// pessoa1.logCalculoMedia(); // ilegal, não posso acessar método privado
// pessoa1.mensagem(); // ilegal, não posso acessar método statico "de classe" em instancias
PessoaFisica.mensagem();


// Exemplo de uso
const pessoa2 = new PessoaJuridica(1, "123.456.323/0001-00");
pessoa2.nome = "João";
pessoa2.notas = [8, 7, 9];
console.log(pessoa2);
console.log(pessoa2.media());
